import React, { useEffect, useState } from "react";
import { Button, Card, Select, Typography, Option, Tabs, Tab, TabsHeader, Input, CardFooter,
} from "@material-tailwind/react";
import { redirect, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon  } from "@heroicons/react/24/outline";
import {  ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { getInfoParameter } from "../../api/manning.api";
import Manning from "../../pages/manning";
import { createRoute } from "../../redux/slices/routes";
import { useDispatch } from "react-redux";

const TABLE_HEAD = ["Area", "Parameter", "Parameter value",];


function parameterValue(props:any) {
  const [listar, setListar] = useState([]);
  const [hotel, setHotel] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();

  //PAGINATION
  const [ currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentData = listar.slice(indexOfFirst, indexOfLast); 
  const totalPages = Math.ceil(listar.length / usersPerPage);

  useEffect(()=>{
    handleList()
  }, [hotel])

  
  const handleList = async () => {
    try {  
      const response = await getInfoParameter(hotel);
      console.log(response.data) 
      setListar(response.data)
    } catch (error) {
        throw new Error('Login Fail');
    }
    
  };

  const handleSearchTermChange = (e:any) => {
    setSearchValue( (e.target.value).toLowerCase() );
};

  const handleHotelChange = (e: any) => {
    const selectedHotel = (e);
    if(e == ""){
      setHotel("");
    } else{
      setHotel(selectedHotel);
    }
  };

  const redirect = () => {
    const component = "Manning";
    dispatch(createRoute(component))
    props.enviarDatoAlPadre(1);
  };

  return (
    <>
      <div className="h-full w-full pt-10 lg:p-8 p-2">
      
        <div className="flex items-start p-1 pb-8 ">
          <button className="flex items-center cursor-pointer text-colorRoyalton hover:font-semibold " onClick={redirect} >
            <ArrowLeftCircleIcon className="h-7 w-7 text-colorRoyalton mr-1.5 pb-0.5"/> Back
          </button>
        </div> 

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-10 gap-y-4">
          <div className="">
            <Select
              label="Select Hotel"
              value=""
              onChange={handleHotelChange}
            >
              <Option value="">All</Option>
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
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentData
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

                  .map(({ id, area, parameter, parameterValue }, index) => {
                    const positionString = area as string;
                    let positionCapitalized =
                      positionString.charAt(0).toUpperCase() +
                      positionString.slice(1);

                    const isLast = index === listar.length - 1;
                    const classes = isLast
                      ? "p-4 w-1/6"
                      : "p-4 border-b border-blue-gray-50 w-1/6";

                    return (
                      <tr key={id}>
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
                            {parameter}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {parameterValue}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
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
      </div>
    </>
  );
}

export default parameterValue


function enviarDatoAlPadre(arg0: number) {
  throw new Error("Function not implemented.");
}

