import React, { useEffect, useState } from "react";
import { Button, Card, Select, Typography, Option, Tabs, TabsHeader, Tab, Input, IconButton, CardFooter, CardBody,} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { createRoute } from "../redux/slices/routes";
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import ManningInterface from '../interfaces/api/api.interface';
import { getAllInfoManning } from "../api/manning.api";
import { throwError } from "rxjs";

const TABLE_HEAD = ["Position", "50-60", "60-70", "70-80", "80-90", "90-100"];
const data = [
  {
    label: "Spanish Caribean",
    value: "SC",
  },
  {
    label: "None",
    value: "off",
  },
  {
    label: "West Indies",
    value: "WI",
  },
];

const data2 = [
  {
    label: "None",
    value: "off",
  },
  {
    label: "50-60",
    value: "50-60",
  },
  {
    label: "60-70",
    value: "60-70",
  },
  {
    label: "70-80",
    value: "70-80",
  },
  {
    label: "80-90",
    value: "80-90",
  },
  {
    label: "90-100",
    value: "90-100",
  },
];

const TABLE_ROWS2 = [
  {
    position: "Total",
    cincuenta: "5",
    sesenta: "1",
    setenta: "1",
    ochenta: "4",
    noventa: "2",
  },
];

const manning = ({ enviarDatoAlPadre }: { enviarDatoAlPadre: (data: any) => void }) => {
  //FILTERS AND RENDER
  const [listar, setListar] = useState([]);
  const [hotel, setHotel] = useState({ kind: "", value:"" });
  const [region, setRegion] = useState({ kind: "", value:"" });
  const [occupancy, setOccupancy] = useState("");
  const [searchValue, setSearchValue] = useState("");

  //REDUX
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  //PAGINATION
  const [ currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentData = listar.slice(indexOfFirst, indexOfLast); 
  const totalPages = Math.ceil(listar.length / usersPerPage);

  //SUMA DE TODOS LOS VALORES FINALES
  const sumCincuenta = listar.reduce((sum, { cincuenta }) => sum + (cincuenta || 0), 0);
  const sumSesenta = listar.reduce((sum, { sesenta }) => sum + (sesenta || 0), 0);
  const sumSetenta= listar.reduce((sum, { setenta }) => sum + (setenta || 0), 0);
  const sumOchenta = listar.reduce((sum, { ochenta }) => sum + (ochenta || 0), 0);
  const SumNoventa = listar.reduce((sum, { noventa }) => sum + (noventa || 0), 0);


  useEffect(()=>{
    handleList() 
  }, [hotel, region]) //THIS WORKS WHEN HOTEL AND REGIONS IS UPDATED AND RENDER ALL DATA TABLE

  const redirect = () => {
    const component = "Parameter";
    dispatch(createRoute(component))
    enviarDatoAlPadre(1);
  };
  // const redirect = () => {
  //   const component = {
  //     component: "Parameter",
  //     checker: "1",
  //   }
  //   dispatch(childrenRoute(component))
  // };

  const redirect2 = () => {
    navigate("/ratios");
  };

  const handleList = async () => {
    try {  
      const response = await getAllInfoManning(hotel,region); 
      setListar(response.data)

    } catch (error) {
        throw new Error('Login Fail');
    }
    
  };

  const handleHotelChange = (e: any) => {
    const selectedHotel = (e);

    if(e == "off"){

      setHotel(prevHotel => ({
        ...prevHotel,
        kind:'',
        value: ''
      }));

    } else{
      setHotel(prevHotel => ({
        ...prevHotel,
        kind:'hotel',
        value: selectedHotel
      }));
      
    }

  };

  const handleRegionChange = (value:string) => {
    
    if(value == "off"){

      setRegion(prevRegion => ({
        ...prevRegion,
        kind:'',
        value: ''
      }));

    } else{
      setRegion(prevRegion => ({
        ...prevRegion,
        kind:'region',
        value: value
      }));
      
    } 
   };

  const handleOccupancyChange = (value:string) => {
    // if(value == "off"){
    //   setOccupancy(0);
    // } else{
    //   setOccupancy(parseInt(value));
    // } 
    setOccupancy(value === "off" ? '' : value);
  };

  const handleSearchTermChange = (e:any) => {
      setSearchValue( (e.target.value).toLowerCase() );
  };

  return (
    <>
      <div className="h-full w-full pt-10 lg:p-0 xl:p-6 sm:p-4">
        <div className="flex justify-end lg:pr-8 pr-4 pb-8">
          <div className="space-y-1">
            <p
              onClick={redirect}
              className="hover:text-colorRoyalton hover:font-semibold"
            >
              Parameter Value
            </p>
            <p
              onClick={redirect2}
              className="hover:text-colorRoyalton hover:font-semibold"
            >
              Ratio Criteria
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-2 lg:gap-0 xl:gap-6">
          <div>
            <Select
              label="Select Hotel"
              value="off"
              onChange={handleHotelChange}
            >
              <Option value="off">None</Option>
              <Option value="RRC">Royalton Riviera Cancún</Option>
              <Option value="RSC">Royalton Splash Cancún</Option>
              <Option value="RCC">Royalton Chic Cancún</Option>
              <Option value="PHC">Royalton Planet Holliwood Cancún</Option>
              <Option value="RMH">Royalton Mystique Holbox</Option>
            </Select>
          </div>

          <div>
            <Input
              onChange={handleSearchTermChange}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
              crossOrigin={undefined}
            />
          </div>

          <div>
            <Tabs value="off">
              <TabsHeader>
                {data.map(({ label, value }) => (
                  <Tab
                    className="lg:w-40"
                    key={value}
                    value={value}
                    onClick={() => handleRegionChange(value)}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>

          <div>
            <Tabs value="off">
              <TabsHeader>
                {data2.map(({ label, value }) => (
                  <Tab
                    className="lg:w-40"
                    key={value}
                    value={value}
                    onClick={() => handleOccupancyChange(value)}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>
        </div>

        <div className="pt-8">
          <Card className="overflow-scroll">
            {/*overflow-scroll*/}
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                        {/* {(occupancy === head || occupancy === '') && head} */}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentData
                  //  .filter(item => {               //NO BORRAR ESTA BUENO ESTE CODIGO
                  //   if (occupancy === 0) {
                  //     return true;
                  //   } else {
                  //     const occupancyInRange = Object.values(item).some((itemValue) =>
                  //       typeof itemValue === 'number' && itemValue >= occupancy && itemValue < occupancy + 10
                  //     );
                  //     return occupancyInRange;
                  //   }
                  // })
                  .filter((item) => {
                    return (
                      searchValue === "" ||
                      Object.values(item).some((itemValue) =>
                        itemValue
                          ?.toString()
                          .toLowerCase()
                          .includes(searchValue)
                      )
                    );
                  })

                  .map(
                    (
                      {
                        position,
                        cincuenta,
                        sesenta,
                        setenta,
                        ochenta,
                        noventa,
                      },
                      index
                    ) => {
                      
                      const isLast = index === listar.length - 1;
                      const classes = isLast
                        ? "p-4 w-1/6"
                        : "p-4 border-b border-blue-gray-50 w-1/6";

                      return (
                        <tr key={position}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {position}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >

                              {(occupancy === "50-60" || occupancy === "") &&
                                cincuenta}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {(occupancy === "60-70" || occupancy === "") &&
                                sesenta}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {(occupancy === "70-80" || occupancy === "") &&
                                setenta}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {(occupancy === "80-90" || occupancy === "") &&
                                ochenta}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {(occupancy === "90-100" || occupancy === "") &&
                                noventa}
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal text-colorRoyalton"
              >
               Pagina {currentPage} of {totalPages}
              </Typography>
              <div className="flex gap-2">
                <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="bg-colorRoyalton text-white border:bg-colorRoyalton" variant="outlined" size="sm">
                  Previous
                </Button>
                <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}  variant="outlined" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="pt-6">
          <Card className="">
            {" "}
            {/*overflow-scroll*/}
            <table className="w-full min-w-max table-auto text-left">
              <tbody className="">
                {TABLE_ROWS2.map(
                  (
                    { position, cincuenta, sesenta, setenta, ochenta, noventa },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS2.length - 1;
                    const classes = isLast
                      ? "p-4 w-1/6"
                      : "p-4 border-b border-blue-gray-50 w-1/6";

                    return (
                      <tr key={position}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {position}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {sumCincuenta}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {sumSesenta}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {sumSetenta}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {sumOchenta}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {SumNoventa}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </Card>
        </div>

        {/* <div className="md:col-span-5 text-right mt-8 lg:mr-4">
          <div className="inline-flex mr-1">
            <Button
              variant="outlined"
              size="md"
              className="bg-colorRoyalton rounded-2xl"
              color="white"
            >
              Excel
            </Button>
          </div>
          <div className="inline-flex ml-1 ">
            <Button variant="outlined" size="md" className=" rounded-2xl">
              PDF
            </Button>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default manning;
