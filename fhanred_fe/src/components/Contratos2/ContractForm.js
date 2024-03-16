import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import PersonalInfoStep from './PersonalInforStep';
import TechnicalDetailsStep from './TechnicalDetailsStep';
import DigitalSignatureStep from './DigitalSignatureStep';
import {  validateTechnicalDetails } from './validations';

function ContractForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="contract-form">
      <ProgressBar currentStep={currentStep} totalSteps={3} nextStep={nextStep} previousStep={previousStep} />
      {currentStep === 1 && <PersonalInfoStep />}
      {currentStep === 2 && <TechnicalDetailsStep />}
      {currentStep === 3 && <DigitalSignatureStep />}
    </div>
  );
}

export default ContractForm;