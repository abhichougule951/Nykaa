import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import BillingAddress from './BillingAddress';
import Payment from './Payment';
import Review from './Review';

const steps = ['Billing Address', 'Review & Confirm', 'Payment'];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0); 

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

const renderStep = () => {
  switch (activeStep) {
    case 0:
      return <BillingAddress nextStep={handleNext} />;
    case 1:
      return <Review  nextStep={handleNext}/>;
    case 2:
      return <Payment />;
    default:
      return null;
  }
};


  return (
    <Box className="flex flex-col items-center justify-center h-50 mt-10">
      <Box className="w-3/4 bg-gray-200 p-4 rounded-md mb-4">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box className="mb-4">
      
          Step {activeStep + 1} of 3: {steps[activeStep]}
        </Box>
        {renderStep()}
       
      </Box>
    </Box>
  );
};

export default CheckoutPage;
