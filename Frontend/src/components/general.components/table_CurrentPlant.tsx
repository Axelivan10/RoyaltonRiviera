import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { TableCellsIcon } from "@heroicons/react/20/solid";
import { getHotels, updateHotelInfo } from "../../api/manning.api";
import Swal from "sweetalert2";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";

const TABLE_HEAD = [
  "Company",
  "Region",
  "Country Code",
  "Country",
  "Brand",
  "BrandCode",
  "Plant Code",
  "Plant Description",
  "Rooms",
  "Size",
  "Size Rank",
  "Country Rank",
  ""
];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

interface EditValue {
  brand: string;
  brandCode: string;
  company: string;
  country: string;
  countryCode: string;
  countryRank: number;
  id: number;
  plantCode: string;
  plantDescription: string;
  plantId: number;
  region: string;
  rooms: number;
  size: string;
  sizeRank: number;
}

function tableCurrentPlant() {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [isActivate, setIsActivate] = useState(0);
  const [editValues, setEditValues] = useState<EditValue[]>([]);
  
  const handleOpen = () => {
    setOpen(!open);
    setIsActivate(0);
    setEditValues(list)
    renderTablePlant()
  }

  useEffect(() => {
    renderTablePlant();
  }, []);

  useEffect(() => {
    setEditValues(list)
    console.log(editValues)
  }, [list]);

  const renderTablePlant = async () => {
    const list2:[] = [];
    try {  
      const response = await getHotels();
      setList(list2);
      setList(response.data);
    } catch (error) {
        throw new Error('Hotel Table Fail');
    }
  };

  const activeInputById = (id:number) => {
    // (isActivate ? setIsActivate(0): setIsActivate(id))
    
    // if(isActivate){
    //     setIsActivate(0)
    // } else{
    //     setIsActivate(id)
    // }
    setIsActivate(id)
  }

  const handleInputChange = (ids: number, fields: string, values: any) => {
    const updatedValues: EditValue[] = editValues.map(item =>
      item.id === ids ? { ...item, [fields]: values } : item
    );
    setEditValues(updatedValues);
  };

  const saveAllChanges = () => {
    const list2:[] = [];
    try {
      handleOpen()
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Save changes",
      }).then(result => {
        if (result.isConfirmed) {
          updateHotelInfo(editValues);
          Swal.fire({
            title: "You make a new request",
            text: "Your request will be checked by an administrator.",
            icon: "success",
          });
        }
      });  
    } catch (error) {
        throw new Error('Hotel Table Fail');
    }
  }

  return (
    <>
      <Tooltip
        content={
          <div className="w-80">
            <Typography color="white" className="font-medium">
              Current Table Plant
            </Typography>
            <Typography
              variant="small"
              color="white"
              className="font-normal opacity-80"
            >
              This plant chart is for your information.
            </Typography>
          </div>
        }
      >
        <TableCellsIcon
          onClick={handleOpen}
          className="w-5 h-5 hover:text-colorRoyalton"
        ></TableCellsIcon>
      </Tooltip>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xl"
        >
      
        <DialogHeader className="">Current Plant Table</DialogHeader>

        <DialogBody className="w-full">
        
          <Card
            className="h-full w-full overflow-scroll"
            style={{ maxHeight: "650px" }}
          >
            {" "}
            {/*  overflow-x-hidden */}
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="sticky top-0 left-0 z-50 border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                {editValues.map(
                  (
                    {
                      id,
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}                            
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.company || ''}
                            onChange={(e) => handleInputChange(id, 'company', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}                            
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.region || ''}
                            onChange={(e) => handleInputChange(id, 'region', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}                           
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.countryCode || ''}
                            onChange={(e) => handleInputChange(id, 'countryCode', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}                            
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.country || ''}
                            onChange={(e) => handleInputChange(id, 'country', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}                            
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.brand || ''}
                            onChange={(e) => handleInputChange(id, 'brand', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}                            
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.brandCode || ''}
                            onChange={(e) => handleInputChange(id, 'brandCode', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.plantCode || ''}
                            onChange={(e) => handleInputChange(id, 'plantCode', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.plantDescription || ''}
                            onChange={(e) => handleInputChange(id, 'plantDescription', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>
                       
                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.rooms || ''}
                            onChange={(e) => handleInputChange(id, 'rooms', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.size || ''}
                            onChange={(e) => handleInputChange(id, 'size', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.sizeRank || ''}
                            onChange={(e) => handleInputChange(id, 'sizeRank', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={classes}>
                          <input
                            type="text"
                            className={`text-center border border-gray-100 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900 ${
                              id === isActivate ? 'bg-colorRoyalton text-white' : ''
                            }`}
                            style={{ maxWidth: "100px" }}
                            value={editValues.find(item => item.id === id)?.countryRank || ''}
                            onChange={(e) => handleInputChange(id, 'countryRank', e.target.value)}
                            disabled={id !== isActivate}
                          />
                        </td>

                        <td className={`sticky right-0 bg-white m-0 ${classes}`}>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium hover:text-colorRoyalton hover:font-semibold"
                            onClick={()=> activeInputById(id)}
                          >
                            Edit
                          </Typography>
                        </td>

                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </Card>

        </DialogBody>

        <DialogFooter>
          <div className="flex gap-2 pr-4 pb-2">
            <Button
              className="bg-colorRoyalton text-white border:bg-colorRoyalton"
              variant="outlined"
              size="sm"
              onClick={saveAllChanges}
            >
              Save
            </Button>
            <Button onClick={handleOpen} variant="outlined" size="sm">
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default tableCurrentPlant;



// <td className={classes}>
// <Typography
//   variant="small"
//   color="blue-gray"
//   className="font-normal"
// >
//   {company}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {region}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {countryCode}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {country}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {brand}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {brandCode}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {plantCode}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {plantDescription}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {rooms}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {size}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {sizeRank}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   {countryRank}
// </Typography>
// </td>
// <td className={classes}>
// <Typography
//   as="a"
//   href="#"
//   variant="small"
//   color="blue-gray"
//   className="font-medium"
// >
//   Edit
// </Typography>
// </td>
