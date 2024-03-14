import BASE_URL from "../../Config";

import {
    SEND_CONTRACT_STEP1_REQUEST,
    SEND_CONTRACT_STEP1_SUCCESS,
    SEND_CONTRACT_STEP1_FAILURE,
  } from '../actions-types';
  
  // Acción para enviar la solicitud del paso 1 del contrato
  export const sendContractStep1Request = () => ({
    type: SEND_CONTRACT_STEP1_REQUEST,
  });
  
  // Acción para el éxito en el envío del paso 1 del contrato
  export const sendContractStep1Success = (data) => ({
    type: SEND_CONTRACT_STEP1_SUCCESS,
    payload: data,
  });
  
  // Acción para el fracaso en el envío del paso 1 del contrato
  export const sendContractStep1Failure = (error) => ({
    type: SEND_CONTRACT_STEP1_FAILURE,
    payload: error,
  });