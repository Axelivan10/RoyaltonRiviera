import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import MasterRatios from '../components/manningConfig.components/masterRatios';
import TableSTD from '../components/manning.components/tableSTD';
import { BuildingOfficeIcon, MapPinIcon, ClockIcon, TruckIcon, HomeIcon, BookmarkIcon, ArchiveBoxIcon, TableCellsIcon, PresentationChartBarIcon } from '@heroicons/react/20/solid';
import { resetUser } from '../redux/slices/user';
import NavbarApp from '../components/general.components/navbar-app';
import { Dialog, Transition } from '@headlessui/react';
import  Location  from '../components/manningConfig.components/location';
import Plant from '../components/manningConfig.components/plant';
import Shift from '../components/manningConfig.components/shift';
import ServiceType from '../components/manningConfig.components/serviceType';
import Position from '../components/manningConfig.components/position';
import { createRoute,  } from '../redux/slices/routes';
import Positionxlocation from '../components/manningConfig.components/positionxlocation';
import SizeCriteria from '../components/manningConfig.components/sizeCriteria';
import StandardTable from '../components/manningConfig.components/standardTable';
import FlowsRest from '../components/manningConfig.components/flowsRest';
import FlowsGrl from '../components/manningConfig.components/flowsGrl';
import KitchenGrl from '../components/manningConfig.components/kitchenGrl';
import KitchenBack from '../components/manningConfig.components/kitchenBack';
import AdaptedH from '../components/manningConfig.components/adaptedH';
import AdaptedR from '../components/manningConfig.components/adaptedR';
import Absentessiem from '../components/manningConfig.components/absentessiem';
import { getMasterParameter, getMasterRatiosOrderConfig, getRelationsMasterRatiosConfig, getRelationsOperations, getRelationsSizeCriteriaConfig, getRelationsSizeCriteriaOrderConfig, getRelationsStandardTableConfig } from '../api/manning.api';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface DataItem {
  rt?: number;
  std?: number;
  ratio?: number;
}

function manningConfig(props:any) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentComponent, setCurrentComponent] = useState(<Location/>);
  const [active, setActive] = useState(1);
  const routeData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  // const [ratioValue, setRatioValue] = useState<Array<{ id: number, valueRatio: number }>>([]);

  const navigation = [   //ESTE ES EL TITULO DEL SIDEBAR DEJAR
  { name: 'Location', to: <Location/>, icon: MapPinIcon, value:1, current: (active == 1 ? true :  false) },
  { name: 'Plant', to: <Plant/>, icon: BuildingOfficeIcon, value:2, current: (active == 2 ? true :  false) },
  { name: 'Shift', to: <Shift/>, icon: ClockIcon, value:3, current: (active == 3 ? true :  false) },
  { name: 'Service Type', to: <ServiceType/>, icon: TruckIcon, value:4, current: (active == 4 ? true :  false) },
  { name: 'Position', to: <Position/>, icon: BookmarkIcon, value:5, current: (active == 5 ? true :  false) },
  { name: 'Position-Location', to: <Positionxlocation/>, icon: ArchiveBoxIcon, value:6, current: (active == 6 ? true :  false) },
  { name: 'Standard Table', to: <StandardTable/>, icon: TableCellsIcon, value:7, current: (active == 7 ? true :  false) },
  { name: 'Master Ratios', to: <MasterRatios/>, icon: PresentationChartBarIcon, value:8, current: (active == 8 ? true :  false) },
  { name: 'Size Criteria', to: <SizeCriteria/>, icon: PresentationChartBarIcon, value:9, current: (active == 9 ? true :  false) },
  { name: 'Flows Rest', to: <FlowsRest/>, icon: PresentationChartBarIcon, value:10, current: (active == 10 ? true :  false) },
  { name: 'Flows Grl', to: <FlowsGrl/>, icon: PresentationChartBarIcon, value:11, current: (active == 11 ? true :  false) },
  { name: 'Kitchen Grl', to: <KitchenGrl/>, icon: PresentationChartBarIcon, value:12, current: (active == 12 ? true :  false) },
  { name: 'Kitchen Back', to: <KitchenBack/>, icon: PresentationChartBarIcon, value:13, current: (active == 13 ? true :  false) },
  { name: 'AdaptedH', to: <AdaptedH/>, icon: PresentationChartBarIcon, value:14, current: (active == 14 ? true :  false) },
  { name: 'AdaptedR', to: <AdaptedR/>, icon: PresentationChartBarIcon, value:15, current: (active == 15 ? true :  false) },
  { name: 'Absentessiem', to: <Absentessiem/>, icon: PresentationChartBarIcon, value:16, current: (active == 16 ? true :  false) },
]


  useEffect(()=>{
    resultsCalculate()
  }, [])

  // useEffect(()=>{
  // }, [])

  const redirect = () => {
  try {
    const component = "DashboardCards";
    dispatch(createRoute(component));
    props.enviarDatoAlPadre(1);
  } catch {
    navigate("/dashboard")
  }
  };

  const logOut = () =>{
    dispatch(resetUser());
    navigate('/')  
  }

  const actualizarEstado = (nuevoEstado:boolean) => {
    setSidebarOpen(nuevoEstado);
  };

  const handleComponentChange = (component: any, value:number) => {
    setCurrentComponent(component);
    setActive(value)
    setSidebarOpen(false)
  };

  const resultsCalculate = async () =>{
    try {
      const resultStandardTable = await getRelationsStandardTableConfig()
      //console.log(resultStandardTable.data)

      const resultMasterOrderRatio = await getMasterRatiosOrderConfig()
      //console.log(resultMasterOrderRatio.data)

      const resultMasterParameter = await getMasterParameter()
      // console.log(resultMasterParameter.data)

      const resultTable = await getRelationsOperations()
      //console.log(resultTable.data)

      const sizeCriteriaOrder = await getRelationsSizeCriteriaOrderConfig()
      // console.log(sizeCriteriaOrder.data)

      const dataStandardTable = resultStandardTable.data;
      const dataMasterRatios = resultMasterOrderRatio.data;
      const dataMasterParameter = resultMasterParameter.data
      const dataResultTable = resultTable.data
      const dataSizeCriteriaOrder = sizeCriteriaOrder.data


      dataResultTable.map((item: any, id: number) => {
        
        const resultadoTableStandard = dataStandardTable.find((standardItem: any) => {
          console.log(item.id)
          return (
            item.positiondim.positionId === standardItem.dimPosition.positionId &&
            item.parameter.parameterId === standardItem.parameter.parameterId &&
            item.shift.shiftId === standardItem.shift.shiftId
          );

        });
          // console.log(resultadoTableStandard)


      if(resultadoTableStandard.std && resultadoTableStandard.rt){

          let ratioMaster = 0 ;
          let ratioStd = resultadoTableStandard.ratio;
          let parameterMaster = 0 ;
          let parameterStd = 0;
          let ratiosResult = 0;
          let stdResult = 0;
          const resultadoSizeCriteria = dataSizeCriteriaOrder.find((SizeItem: any) => {
            return (
              resultadoTableStandard.criteria === SizeItem.sizeCriteria &&

              item.plant.rooms >= SizeItem.min && item.plant.rooms <= SizeItem.max
            );
          });

          switch (resultadoSizeCriteria.size) {

            case "XS":
              parameterStd = (resultadoTableStandard.xs ? resultadoTableStandard.xs : ""); //ESTA MANERA ESTA MEJOR
              break;
            case "X":
              parameterStd = resultadoTableStandard.s;
              break;
            case "M":
              parameterStd = resultadoTableStandard.m;
              break;
            case "L":
              parameterStd = resultadoTableStandard.l;
              break;
            case "XL":
              parameterStd = resultadoTableStandard.xl;
              break;
            default:
              console.log("Opción no válida");
          }

          stdResult = (parameterStd / ratioStd);





          const resultadoMasterRatios = dataMasterRatios.find((RatiosItem: any) => {
            return (
              item.positiondim.positionDescriptionES === RatiosItem.positionDescription
              &&
              item.serviceType.serviceTypeCode=== RatiosItem.serviceType
              &&
              item.parameter.parameter === RatiosItem.parameter
              &&
              item.plant.countryCode=== RatiosItem.country
            );  
          });

          // console.log(resultadoMasterRatios)

          ratioMaster = resultadoMasterRatios.value;

          const resultadoParameter = dataMasterParameter.find((parameterItem: any) => {
            return (
              item.location.area === parameterItem.location
              &&
              item.plant.plantCode === parameterItem.hotel
              // && 
              // item.parameter.parameter === parameterItem.parameter
            );  
          });

          if(resultadoParameter){
            // console.log(resultadoParameter.parameterValue, "parameter", id)
            parameterMaster = resultadoParameter.parameterValue;
            ratiosResult = ((ratioMaster ? parameterMaster : 0) / ratioMaster);
          }

          item.paxResult = (stdResult > ratiosResult? stdResult : ratiosResult)


        }




        
        else if(resultadoTableStandard.std){
          console.log("estoy en std")
          item.ratio = resultadoTableStandard.ratio;

          const resultadoSizeCriteria = dataSizeCriteriaOrder.find((SizeItem: any) => {
            return (
              resultadoTableStandard.criteria === SizeItem.sizeCriteria &&

              item.plant.rooms >= SizeItem.min && item.plant.rooms <= SizeItem.max
            );
          });


        //dataMasterParameter AQUI VA MASTER PARAMETER

          console.log(resultadoSizeCriteria)

          switch (resultadoSizeCriteria.size) {

            case "XS":
              item.parameterValue = (resultadoTableStandard.xs ? resultadoTableStandard.xs : ""); //ESTA MANERA ESTA MEJOR
              break;
            case "X":
              item.parameterValue = resultadoTableStandard.s;
              break;
            case "M":
              item.parameterValue = resultadoTableStandard.m;
              break;
            case "L":
              item.parameterValue = resultadoTableStandard.l;
              break;
            case "XL":
              console.log("xl", resultadoTableStandard.ratio, resultadoTableStandard.xl)
              item.parameterValue = resultadoTableStandard.xl;
              break;
            default:
              console.log("Opción no válida");
          }

          item.paxResult = (item.parameterValue / item.ratio);
          // item.paxResult = (item.parameterValue > (item.parameterValue / item.ratio)) ? item.parameterValue : item.ratio / item.parameterValue;

        }

        else if(resultadoTableStandard.rt){
          console.log("estoy en rt")
          // console.log(resultado.ratio, "ratio", id);

          const resultadoMasterRatios = dataMasterRatios.find((RatiosItem: any) => {
            return (
              item.positiondim.positionDescriptionES === RatiosItem.positionDescription
              &&
              item.serviceType.serviceTypeCode=== RatiosItem.serviceType
              &&
              item.parameter.parameter === RatiosItem.parameter
              &&
              item.plant.countryCode=== RatiosItem.country
            );  
          });

          // console.log(resultadoMasterRatios)

          item.ratio = resultadoMasterRatios.value;

          const resultadoParameter = dataMasterParameter.find((parameterItem: any) => {
            return (
              item.location.area === parameterItem.location
              &&
              item.plant.plantCode === parameterItem.hotel
              // && 
              // item.parameter.parameter === parameterItem.parameter
            );  
          });

          if(resultadoParameter){
            // console.log(resultadoParameter.parameterValue, "parameter", id)
            item.parameterValue = resultadoParameter.parameterValue;
            item.paxResult = ((item.parameterValue ? item.parameterValue : 0) / item.ratio);
          }

          // console.log(item.ratio, item.parameterValue)

        } 


        else{
          console.log("otro")
        }

        return item;
      });

      console.log(dataResultTable)

    } catch (error) {
      throw new Error("Something wrong");
    }
  }


  return (
    <div className="bg-gray-50 dark:bg-gray-900 "> 
    <NavbarApp estado={sidebarOpen} actualizarEstado={actualizarEstado} />

    <div className="flex h-screen overflow-hidden">

      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <HomeIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <p className="font-semibold text-colorRoyalton">
                    Main modules
                  </p>
                </div>
                <nav aria-label="Sidebar" className="mt-5">
                  <div className="px-2 space-y-1 cursor-pointer">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        onClick={() => handleComponentChange(item.to, item.value)}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 text-colorRoyalton font-semibold"
                            : "text-colorRoyalton hover:bg-gray-50",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-colorRoyalton"
                              : "text-colorRoyalton",
                            "mr-4 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
              <div className='pb-4 p-2 border-t border-gray-400'>
                <nav aria-label="Sidebar" className="space-y-1 flex">
                  <a 
                    onClick={redirect}
                    className="text-colorRoyalton font-semibold border border-transparent
                  font-medium text-sm px-5 py-2.5 block w-full active:bg-gray-200"
                  >Home
                  </a>
                </nav>

                <nav aria-label="Sidebar" className="space-y-1 flex">
                  <a
                    className="text-colorRoyalton font-semibold border border-transparent
                  font-medium text-sm px-5 py-2.5 block w-full active:bg-gray-200"
                  >
                    English / Spanish
                  </a>
                </nav>
                <nav aria-label="Sidebar" className="space-y-1 flex">
                  <a 
                    onClick={logOut}
                    className="text-colorRoyalton font-semibold border border-transparent
                  font-medium text-sm px-5 py-2.5 block w-full active:bg-gray-200"
                  >
                    Log Out
                  </a>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-1 min-h-0 border-r border-gray-200 bg-gray-100">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <p className="font-semibold text-color-black">Tables</p>
              </div>
              <nav className="mt-5 flex-1" aria-label="Sidebar">
                <div className="px-2 space-y-1 cursor-pointer">
                  {navigation.map((item) => (
                    <a 
                      key={item.name}
                      onClick={() => handleComponentChange(item.to, item.value)}
                      className={classNames(
                        item.current
                          ? "bg-gray-200 text-colorRoyalton font-semibold"
                          : "text-colorRoyalton hover:bg-gray-50",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-colorRoyalton"
                            : "text-colorRoyalton",
                          "mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>  
      </div>
      
      {currentComponent}

    </div>

  </div>
  )

}

export default manningConfig