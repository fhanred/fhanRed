import React from 'react';
import PersonalInforStep from './PersonalInforStep'

function ProgressBar({ currentStep, totalSteps, nextStep, previousStep }) {
  const handleNext = () => {
    if (currentStep < totalSteps) {
      nextStep();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      previousStep();
    }
  };

  return (
    <div className="progress-bar">
      <div>Step {currentStep} of {totalSteps}</div>
      {currentStep === 1 && <PersonalInforStep nextStep={nextStep} />}
      <div>
        <button onClick={handlePrevious} disabled={currentStep === 1}>Previous</button>
        <button onClick={handleNext} disabled={currentStep === totalSteps}>Next</button>
      </div>
    </div>
  );
}

export default ProgressBar;