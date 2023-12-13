import React, { useEffect } from 'react'
import { useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const stepper = (props:any) => {
      const [activeStep, setActiveStep] = useState(0);
      const [check, setCheck] = useState(false);

      // const [isLastStep, setIsLastStep] = useState(0);
      // const [isFirstStep, setIsFirstStep] = useState(false);
   
      // const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
      // const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


useEffect(() => {
    setActiveStep(props.estado)
},);

  return (
    <div >
      <Stepper 
        activeStep={activeStep}
        // isLastStep={(value) => setIsLastStep(value)}
        // isFirstStep={(value) => setIsFirstStep(value)}
        activeLineClassName="bg-colorRoyalton"
      >
        
        <Step className="!bg-colorRoyalton" activeClassName="!bg-colorRoyalton" /*onClick={() => setActiveStep(0)}*/>
            
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              className={activeStep === 0 ? "text-colorRoyalton" : "text-blue-gray-600"}
            >
              Step 1
            </Typography>
            <Typography
              className={activeStep === 0 ? "text-colorRoyalton" : "text-blue-gray-600"}
            >
              Get code {props.estado}
            </Typography>
          </div>
        </Step>


        <Step completedClassName="!bg-colorRoyalton" activeClassName="!bg-colorRoyalton" /*onClick={() => setActiveStep(1)}*/>
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              className={activeStep === 1 ? "text-colorRoyalton" : "text-blue-gray-600"}
            >
              Step 2
            </Typography>
            <Typography
               className={activeStep === 1 ? "text-colorRoyalton" : "text-blue-gray-600"}
              
            >
              Enter code
            </Typography>
          </div>
        </Step>
        

        <Step activeClassName="!bg-colorRoyalton"  /*onClick={() => setActiveStep(2)}*/>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              className={activeStep === 2 ? "text-colorRoyalton" : "text-blue-gray-600"}
            >
              Step 3
            </Typography>
            <Typography
               className={activeStep === 2 ? "text-colorRoyalton" : "text-blue-gray-600"}
            
            >
              Success
            </Typography>
          </div>
        </Step>


      </Stepper>

     

    </div>
  )

}

export default stepper