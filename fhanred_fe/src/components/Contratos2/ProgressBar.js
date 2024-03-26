import React from 'react';

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
    <div className="container">
      <div>Step {currentStep} of {totalSteps}</div>
      <button onClick={handlePrevious} disabled={currentStep === 1}>Previous</button>
        <button onClick={handleNext} disabled={currentStep === totalSteps}>Next</button>
    </div>
  );
}

export default ProgressBar;

