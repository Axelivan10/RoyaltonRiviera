  import React, { useEffect, useRef, useState } from "react";
  import { Button, Card, Select, Typography, Option, Tabs, TabsHeader, Tab, Input, IconButton, CardFooter, CardBody, Tooltip,} from "@material-tailwind/react";
  import { useNavigate } from "react-router-dom";
  import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
  import { createRoute } from "../redux/slices/routes";
  import { useAppSelector, useAppDispatch } from '../redux/hooks'
  import ManningInterface from '../interfaces/api/api.interface';
  import { getAllInfoManning, getHotels } from "../api/manning.api";
  import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
  import PDF from '../components/general.components/pdf';
  import { CSVLink, CSVDownload } from 'react-csv';

  const TABLE_HEAD = ["Hotel", "Division", "Department", "Position", "50-60", "60-70", "70-80", "80-90", "90-100"];

  const data = [
    {
      label: "SC",
      value: "SC",
    },
    {
      label: "None",
      value: "off",
    },
    {
      label: "WI",
      value: "WI",
    },
  ];

  const data2 = [
    {
      label: "None",
      value: "off",
    },
    {
      label: "60",
      value: "50-60",
    },
    {
      label: "70",
      value: "60-70",
    },
    {
      label: "80",
      value: "70-80",
    },
    {
      label: "90",
      value: "80-90",
    },
    {
      label: "100",
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


  const manning = (props:any) => {
    //FILTERS AND RENDER
    const [listar, setListar] = useState([]);
    const [hotel, setHotel] = useState("");
    const [regions, setRegions] = useState("");
    const [occupancy, setOccupancy] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [country, setCountry] = useState("")
    const [hotelFilter, setHotelFilter] = useState([])
    
    
    //REDUX
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    //PAGINATION
    const [ currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 16;
    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentData = listar.slice(indexOfFirst, indexOfLast); 
    const totalPages = Math.ceil(listar.length / usersPerPage);

    //SUM ALL THE FINAL VALUES
    const sumCincuenta = listar.reduce((sum, { cincuenta }) => sum + (cincuenta || 0), 0);
    const sumSesenta = listar.reduce((sum, { sesenta }) => sum + (sesenta || 0), 0);
    const sumSetenta= listar.reduce((sum, { setenta }) => sum + (setenta || 0), 0);
    const sumOchenta = listar.reduce((sum, { ochenta }) => sum + (ochenta || 0), 0);
    const SumNoventa = listar.reduce((sum, { noventa }) => sum + (noventa || 0), 0);

    const sumTotal = {
      cincuenta: sumCincuenta,
      sesenta: sumSesenta,
      setenta: sumSesenta,
      ochenta: sumOchenta,
      noventa: SumNoventa
    }

    useEffect(()=>{
      handleList()
      RenderHotelsFilter()
    }, [hotel, regions, country]) //THIS WORKS WHEN HOTEL AND REGIONsS IS UPDATED AND RENDER ALL DATA TABLE

    const redirect = () => {
      const component = "Parameter";
      dispatch(createRoute(component))
      props.enviarDatoAlPadre(1);
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
        const response = await getAllInfoManning(hotel, regions, country); 
        setListar(response.data)
        console.log(response.data)

      } catch (error) {
          throw new Error('Login Fail');
      }
    };

    const handleHotelChange = (e: any) => {
      const selectedHotel = (e.target.value);
      if(e.target.value == ""){
        setHotel("");
      } else{
        setHotel(selectedHotel);
      }

    };

    const handleRegionsChange = (e:any) => {
      const selectedRegions = (e);
      if(e == ""){
        setRegions("");
        setCountry("");
        setHotel("")
        // setvalueHotel("");
      } else{
        setRegions(selectedRegions);
      }
    };
    //  const handleRegionsChange = (e:any) => {   //HAYQ QUE GUARDAR ESTE CODIGO PARA UN FUTURO
    //   const selectedRegions = (e);
    //   if(e == "off"){

    //     setRegions(prevRegions => ({
    //       ...prevRegions,
    //       kind:'',
    //       value: ''
    //     }));

    //   } else{
    //     setRegions(prevRegions => ({
    //       ...prevRegions,
    //       kind:'regions',
    //       value: selectedRegions
    //     }));
    //   }
    //   setCountry("")
    //  };
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

    const handleCountryChange = (e:any) => {  
      if(e == ""){
        // setvalueHotel("")
        setHotel("")
      }
      setCountry(e);
    };

    const RenderHotelsFilter = async () => {
      try {  
        const response = await getHotels(); 
        setHotelFilter(response.data)
      } catch (error) {
          throw new Error('Error in filter');
      }
    };

    const filteredHotels = hotelFilter
    .filter(({ region }) => !regions || region === regions)
    .filter(({ countryCode }) => !country || countryCode === country)

    const redirectManningConfig = () => {
      navigate("/manningConfiguration");
    }
    return (
      <>
        <div className="h-full w-full pt-10 lg:p-0 xl:p-8 sm:p-4 lg:pt-4">
          <div className="flex justify-between  p-4">
            <div className="flex space-x-6 justify-end pr-4 pt-2 pb-4 gap-x-2">
              <PDFDownloadLink
                document={<PDF state={listar} state2={sumTotal} />}
                fileName="ManningData.pdf"
              >
                <p className="cursor-pointer text-colorRoyalton font-semibold hover:text-colorHover">
                  {/* {true? true: (false)} */}
                  PDF
                </p>
              </PDFDownloadLink>

              <CSVLink data={listar} filename={"Manning.csv"}>
                <p className="cursor-pointer text-colorRoyalton font-semibold hover:text-colorHover">
                  Excel
                </p>
              </CSVLink>
            </div>

            <div className="flex flex-col sm:flex-row space-x-6 justify-end pr-4 pt-2 pb-4">
              <p
                onClick={redirect}
                className="cursor-pointer hover:text-colorRoyalton hover:font-semibold"
              >
                Parameter Value
              </p>
              <p
                onClick={redirect2}
                className="cursor-pointer hover:text-colorRoyalton hover:font-semibold"
              >
                Ratio Criteria
              </p>
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                      Manning configuration
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                      This page is all the tables about manning config.
                    </Typography>
                  </div>
                }
              >
                <Cog6ToothIcon onClick={redirectManningConfig}  className="w-5 h-5 hover:text-colorRoyalton"></Cog6ToothIcon>
              </Tooltip>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-2 lg:gap-2 xl:gap-4">
            <div>
              <Input
                onChange={handleSearchTermChange}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                label="Search"
                crossOrigin={undefined}
              />
            </div>

            <div>
              {(country === "MEX" ||
                country === "CRI" ||
                country === "DOM") && (
                <Select
                  label="Select Regions"
                  value={regions}
                  onChange={handleRegionsChange}
                >
                  <Option value="">All</Option>
                  <Option value="SC">Spanish Caribbean</Option>
                </Select>
              )}
              {(country === "GREN" ||
                country === "ANT" ||
                country === "JAM") && (
                <Select
                  label="Select Regions"
                  value={regions}
                  onChange={handleRegionsChange}
                >
                  <Option value="">All</Option>
                  <Option value="WI">West Indies</Option>
                </Select>
              )}
              {country === "" && (
                <Select
                  label="Select Regions"
                  value={regions}
                  onChange={handleRegionsChange}
                >
                  <Option value="">All</Option>
                  <Option value="SC">Spanish Caribbean</Option>
                  <Option value="WI">West Indies</Option>
                </Select>
              )}
            </div>

            {/* <div>
                <Tabs value="off">
                  <TabsHeader>
                    {data.map(({ label, value }) => (
                      <Tab
                        className="lg:w-40"
                        key={value}
                        value={value}
                        onClick={() => handleRegionsChange(value)}
                      >
                        {label}
                      </Tab>
                    ))}
                  </TabsHeader>
                </Tabs>
              </div> */}

            <div>
              {regions === "SC" && (
                <Select
                  label="Select Country"
                  value={country}
                  onChange={(e) => handleCountryChange(e)}
                >
                  <Option value="">All</Option>
                  <Option value="MEX">Mexico</Option>
                  <Option value="CRI">Costa Rica</Option>
                  <Option value="DOM">Dominican Republic</Option>
                </Select>
              )}
              {regions === "WI" && (
                <Select
                  label="Select Country"
                  value={country}
                  onChange={(e) => handleCountryChange(e)}
                >
                  <Option value="">All</Option>
                  <Option value="GREN">Granade</Option>
                  <Option value="ANT">Antigua</Option>
                  <Option value="JAM">Jamaica</Option>
                </Select>
              )}
              {regions === "" && (
                <Select
                  label="Select Country"
                  value={regions}
                  onChange={(e) => handleCountryChange(e)}
                >
                  <Option value="">All</Option>
                  <Option value="MEX">Mexico</Option>
                  <Option value="CRI">Costa Rica</Option>
                  <Option value="DOM">Dominican Republic</Option>
                  <Option value="GREN">Granade</Option>
                  <Option value="ANT">Antigua</Option>
                  <Option value="JAM">Jamaica</Option>
                </Select>
              )}
            </div>

            {/* <div>
              <Select
                label={"Select Hotel"}
                value={valueHotel}
                onChange={handleHotelChange}
              >
                {filteredHotels.map(({ id, plantCode, plantDescription }) => (
                  <Option key={id} value={plantCode}>
                    {plantDescription}
                  </Option>
                ))}
              </Select>
            </div> */}

            <div>
              <select
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
                onChange={handleHotelChange}
                value={hotel}
              >
                <option selected value="">
                  All
                </option>
                {filteredHotels.map(({ id, plantCode, plantDescription }) => (
                  <option key={id} value={plantCode}>
                    {plantDescription}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Select
                label="Select Division"
                value="off"
                onChange={handleHotelChange}
              >
                <Option value="off">All</Option>
                <Option value="ADMIN">Admin</Option>
                <Option value="ENG">Engine</Option>
                <Option value="FINANCE">Finance</Option>
                <Option value="FYB">F&B</Option>
                <Option value="KIT">Kitchen</Option>
                <Option value="OPE">Operation</Option>
                <Option value="PYC">P&C</Option>
                <Option value="ROOM">Rooms</Option>
                <Option value="SYM">S&M</Option>
              </Select>
            </div>

            <div>
              <Select
                label="Select Department"
                value="off"
                onChange={handleHotelChange}
              >
                <Option value="off">All</Option>
                <Option value="accounting">Accounting</Option>
                <Option value="alaCarte">AlaCarte</Option>
                <Option value="bakery">Bakery</Option>
                <Option value="banquets">Banquets</Option>
                <Option value="banquets.">Banquets.</Option>
                <Option value="bars">Bars</Option>
                <Option value="blueLine">BlueLine</Option>
                <Option value="buffet">Buffet</Option>
                <Option value="butcher">Butcher</Option>
                <Option value="comunication">Comunication</Option>
                <Option value="costControl">Cost Control</Option>
                <Option value="diamondClub">Diamond Club</Option>
                <Option value="entertain">Entertain</Option>
                <Option value="facilities">Facilities</Option>
                <Option value="financeAdmin.">FinanceAdmin.</Option>
                <Option value="fitness">Fitness</Option>
                <Option value="frontDesk">Front Desk</Option>
                <Option value="fybAdmin">FyBAdmin</Option>
                <Option value="general">General</Option>
                <Option value="guestR.">GuestR.</Option>
                <Option value="gyw">GyW</Option>
                <Option value="houseke">Houseke</Option>
                <Option value="it">IT</Option>
                <Option value="kitch">Kitch</Option>
                <Option value="kitchenAdmin">KitchenAdmin</Option>
                <Option value="laundry">Laundry</Option>
                <Option value="lyd">LYD</Option>
                <Option value="machines">Machines</Option>
                <Option value="mainKitchen">MainKitchen</Option>
                <Option value="maintRooms">MaintRooms</Option>
                <Option value="management">Management</Option>
                <Option value="miniBars">MiniBars</Option>
                <Option value="pastry">Pastry</Option>
                <Option value="payables">Payables</Option>
                <Option value="payroll">Payroll</Option>
                <Option value="pools">Pools</Option>
                <Option value="publicAreas">PublicAreas</Option>
                <Option value="purchasing">Purchasing</Option>
                <Option value="pycAdmin">PyCAdmin</Option>
                <Option value="quality">Quality</Option>
                <Option value="restaurantHost">RestaurantHost</Option>
                <Option value="restaurants">Restaurants</Option>
                <Option value="roomS.">RoomS.</Option>
                <Option value="roomService">Room Service</Option>
                <Option value="sales/Mkt">Sales/Mkt</Option>
                <Option value="school">School</Option>
                <Option value="security">Security</Option>
                <Option value="spa">Spa</Option>
                <Option value="steward">Steward</Option>
                <Option value="store">Store</Option>
                <Option value="tyc">TyC</Option>
                <Option value="warehouse">Warehouse</Option>
                <Option value="waterSports">Water Sports</Option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 p-2">
            <div>
              <Tabs value="off">
                <TabsHeader>
                  {data2.map(({ label, value }) => (
                    <Tab
                      className=""
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
            <Card className="overflow-scroll md:overflow-hidden">
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
                          hotel,
                          division,
                          department,
                          position,
                          cincuenta,
                          sesenta,
                          setenta,
                          ochenta,
                          noventa,
                        },
                        index
                      ) => {
                        const positionString = position as string;
                        const positionCapitalized =
                          positionString.charAt(0).toUpperCase() +
                          positionString.slice(1);

                        const isLast = index === listar.length - 1;
                        const classes = isLast
                          ? "p-4 w-1/9"
                          : "p-4 border-b border-blue-gray-50 w-1/9";

                        return (
                          <tr key={position}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {hotel}
                              </Typography>
                            </td>

                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {division}
                              </Typography>
                            </td>

                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {department}
                              </Typography>
                            </td>

                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {positionCapitalized}
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
                  {totalPages === 0
                    ? `Page ${currentPage} of 1`
                    : `Page ${currentPage} of ${totalPages}`}
                </Typography>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-colorRoyalton text-white border:bg-colorRoyalton"
                    variant="outlined"
                    size="sm"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="outlined"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="pt-6">
            <Card className="overflow-scroll md:overflow-hidden">
              <table className="w-full min-w-max table-auto text-left">
                <tbody className="">
                  {TABLE_ROWS2.map(({ position }, index) => {
                    const isLast = index === TABLE_ROWS2.length - 1;
                    const classes = isLast
                      ? "p-4 w-1/9"
                      : "p-4 border-b border-blue-gray-50 w-1/9";

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
                            color="white"
                            className="font-normal"
                          >
                            {position}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {position}
                          </Typography>
                        </td>

                        {occupancy == "" && (
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal"
                            >
                              {position}
                            </Typography>
                          </td>
                        )}

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {(occupancy === "50-60" || occupancy === "") &&
                              sumCincuenta}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {(occupancy === "60-70" || occupancy === "") &&
                              sumSesenta}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {(occupancy === "70-80" || occupancy === "") &&
                              sumSetenta}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {(occupancy === "80-90" || occupancy === "") &&
                              sumOchenta}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {(occupancy === "90-100" || occupancy === "") &&
                              SumNoventa}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </>
    );
  }

  export default manning;


    {/* <div className="md:col-span-5 text-left mt-8 lg:mr-4">
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