import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import PersonalInfoStep from './PersonalInfoStep';
import SelectPlan from './SelectPlan';
import Address from './Address';
import { useDispatch } from 'react-redux';
import { createContract } from '../../Redux/Actions/actions';

function ContractForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({});
  const [planInfo, setPlanInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const totalSteps = 3;

  const handlePersonalInfoSubmit = (data) => {
    setPersonalInfo(data);
    console.log("Datos del formulario de información personal:", data);
    nextStep();
  };

  const handlePlanSubmit = (data) => {
    setPlanInfo(data);
    console.log("Datos del formulario de Plan:", data);
    nextStep();
  };

  const handleAddressSubmit = (data) => {
    console.log("Datos recibidos en handleAddressSubmit:", data);
    setAddressInfo(data);
    createContractBackend();
  };

  const createContractBackend = async () => {
    try {
      const contractData = { ...personalInfo, ...planInfo, ...addressInfo };
      await dispatch(createContract(contractData));
      alert("Por favor, revisa tu correo electrónico para continuar.");
      history.push('/');
    } catch (error) {
      console.error('Error al crear contrato:', error);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="contract-form">
      <ProgressBar currentStep={step} totalSteps={totalSteps} />
      {step === 1 && <PersonalInfoStep onSubmit={handlePersonalInfoSubmit} nextStep={nextStep} />}
      {step === 2 && <SelectPlan onSubmit={handlePlanSubmit}  nextStep={nextStep} />}
      {step === 3 && <Address onSubmit={handleAddressSubmit}  />}
    </div>
  );
}

export default ContractForm;
