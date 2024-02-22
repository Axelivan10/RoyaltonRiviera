import { Card, Radio, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { getRelationsFlowsGrlConfig, getRelationsFlowsRestConfig, getRelationsKitchenGrlConfig, getRelationsSizeCriteriaConfig, updateFlowsGrlConfig, updateFlowsRestConfig, updateKitchenGrlConfig, updateSizeCriteriaConfig } from '../../api/manning.api';
import Swal from 'sweetalert2';

const TABLE_HEAD = ["Criteria", "Parameter", "Service Type", "Serv/Shift", "WorkSt", "ServShiftConca",
 "SCC", "SPC", "SA", "SB", "SC", "SPZ", "SSH", "SBF", "MCC", "MCP", "MA", "MB", "MC", "MPZ", "MSH",
 "MBF", "LCC", "LCP", "LA", "LB", "LC", "LPZ", "LSH", "LBF", "XLCC", "XLCP", "XLA", "XLB", "XLC", "XLPZ", "XLSH", "XLBF"];
  
  interface relationsAll {
    id: number;
    parameter:{
      parameterId:number;
      parameter:string;
      },
      serviceType: {
        serviceTypeId: number;
        serviceTypeCode: string;
      },
      shift: {
        id: number;
        shift: string;
      },
      criteria: string;
      workSt:string;
      servShift:string;
      scc: number;
      scp: number;
      sa: number;
      sb: number;
      sc: number;
      spz: number;
      ssh: number;
      sbf: number;
      mmc: number;
      mcp: number;
      ma: number;
      mb: number;
      mc: number;
      mpz: number;
      msh: number;
      mbf: number;
      lcc:number;
      lcp: number;
      la: number;
      lb: number;
      lc: number;
      lpz: number;
      lsh: number;
      lbf: number;
      xlcc: number;
      xlcp: number;
      xla: number;
      xlb: number;
      xlc: number;
      xlpz: number;
      xlsh: number;
      xlbf: number;
  }

function kitchenGrl() {
  const [relationsKitchenGrl, setRelationsKitchenGrl] = useState<relationsAll[]>([]);
  const [initialValues, setinitialValues] = useState<relationsAll[]>([]);
  const [modifiedCurrentPositions, setModifiedCurrentPositions] = useState<relationsAll[]>([]);
  const [nullList, setNullList] = useState<relationsAll[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isActiveRadio, setIsActiveRadio] = useState<number | null>(0);

  useEffect(()=>{
    renderList()
  },[])

  useEffect(() => {
    const hasChanges = JSON.stringify(initialValues) !== JSON.stringify(relationsKitchenGrl);
    if (hasChanges) {
      setModifiedCurrentPositions(relationsKitchenGrl);
    }
    console.log(relationsKitchenGrl)
  }, [relationsKitchenGrl]);  

  useEffect(() => {
    if (!isActive && modifiedCurrentPositions.length > 0) {
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
          // Lógica para manejar la confirmación
          Swal.fire({
            title: "You make a new request",
            text: "Your request will be checked by an administrator.",
            icon: "success",
          });
          updateData()
          setinitialValues(relationsKitchenGrl)
        } else {
          setRelationsKitchenGrl(initialValues)
        }
      });
    } else {
      // Lógica para manejar cuando no hay posiciones modificadas o isActive está activado
      console.log("No hay posiciones modificadas o isActive está activado");
    }
    setModifiedCurrentPositions(nullList)
  }, [isActive, ]);

  const renderList = async () => {
    try {
        const responseRelationsKitchenGrlConfig = await getRelationsKitchenGrlConfig();
        setRelationsKitchenGrl(responseRelationsKitchenGrlConfig.data)
        setinitialValues(responseRelationsKitchenGrlConfig.data)
        console.log(responseRelationsKitchenGrlConfig.data)
      } catch {
      throw new Error("Render Fail");
    }
  };

  const activeInputs = () => {
    setIsActive(!isActive);
  };

    const handleInputChange = ( id: number, value:string, property: string ) => {
      if(!isNaN(Number(value))){
        const numberValue = Number(value);  
        setRelationsKitchenGrl((prevRelations) =>
          prevRelations.map((relation) =>
            relation.id === id ? { ...relation, [property]: numberValue || 0 } : relation
          )
        );
      }
    };
  
  const updateData = () => {
    try {
      updateKitchenGrlConfig(relationsKitchenGrl);
    } catch (error) {
      throw new Error("Send Information Fail");
    }
  };
  return (
    <div className="flex flex-col h-screen w-screen md:p-6 p-2 xl:w-10/12 xl:pl-20 pt-10">
    <div className="flex flex-col-1 gap-8 ml-auto pr-4 pt-0.5 justify-end p-4 pb-6">
      <div>
        {isActive ? (
          <p
            onClick={activeInputs}
            className="cursor-pointer hover:text-colorRoyalton hover:font-semibold"
          >
            Guardar cambios
          </p>
        ) : (
          <p
            onClick={activeInputs}
            className="cursor-pointer hover:text-colorRoyalton hover:font-semibold"
          >
            Habilitar campos
          </p>
        )}
      </div>
    </div>

    <Card
      className="h-full w-full overflow-scroll"
      style={{ maxHeight: "670px" }}
    >
      <table className="w-full min-w-max table-auto text-left ">
        <thead className="bg-white">
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className={
                head === "Criteria"
                  ? "text-center sticky top-0 left-0 z-50 bg-blue-gray-50 p-4 border-b border-blue-gray-100"
                  : "text-center sticky top-0 border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              }
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
        </thead>
        <tbody>
            {relationsKitchenGrl.map(
            ({
              id, criteria, parameter, serviceType, shift, workSt, servShift              , 
            }) => (
              <tr key={id}>
                <td className="sticky left-0 top-0 bg-white p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {criteria}
                  </Typography>
                </td>
                <td className="bg-white p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {parameter.parameter}
                  </Typography>
                </td>
                <td className="bg-white p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {serviceType.serviceTypeCode}
                  </Typography>
                </td>
                <td className="bg-white p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {shift.shift}
                  </Typography>
                </td>
                <td className="bg-white p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {workSt}
                  </Typography>
                </td>
                <td className="bg-white p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {servShift}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.scc
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "scc")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.scp
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "scp")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.sa
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "sa")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.sb
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "sb")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.sc
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "sc")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.spz
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "spz")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.ssh
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "ssh")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.sbf
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "sbf")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.mmc
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "mmc")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.mcp
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "mcp")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.ma
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "ma")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.mb
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "mb")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.mc
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "mc")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.mpz
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "mpz")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.msh
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "msh")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.mbf
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "mbf")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.lcc
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "lcc")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.lcp
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "lcp")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.la
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "la")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.lb
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "lb")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.lc
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "lc")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.lpz
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "lpz")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.lsh
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "lsh")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.lbf
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "lbf")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.xlcc
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "xlcc")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.xlcp
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "xlcp")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.xla
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "xla")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.xlb
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "xlb")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.xlc
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "xlc")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.xlpz
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "xlpz")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.xlsh
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "xlsh")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="text"
                    className="text-center border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-gray-900"
                    style={{ maxWidth: "100px" }}
                    value={
                      relationsKitchenGrl.find((relation) => relation.id === id)
                        ?.xlbf
                    }
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "xlbf")
                    }
                    disabled={!isActive}
                    maxLength={2}
                  />
                </td>
                 {/* <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="radio"
                    name="type"
                    checked={isActiveRadio === id}
                    onChange={(e) =>
                      handleInputChange(id, e.target.value, "radio")
                    }
                  />
                </td>  */}
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  </div>
  )
}

export default kitchenGrl