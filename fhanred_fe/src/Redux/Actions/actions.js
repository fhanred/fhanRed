import BASE_URL from '../../Config';


import axios from "axios";
import {
  SIGNIN_USER,
  CLEAN_DETAIL,
  CREATE_INVOICE,
  INCREMENT_NUMBER_FACT,
  CREATE_USER,
  GET_USERS,
  FETCH_CONTRACT_DETAILS_SUCCESS,
  FETCH_CONTRACT_DETAILS_FAILURE,
  FETCH_LAST_RECEIPT_NUMBER_SUCCESS,
  FETCH_LAST_RECEIPT_NUMBER_FAILURE
} from "./actions-types";

export const userInfo = (input) => async (dispatch) => {
  try {
    console.log('input: ', input)
    const dataUser = await axios.post('${BASE_URL}/auth/login', input);
    console.log('status: ', dataUser.status);

    if (!dataUser.data) {
      return dispatch({ type: SIGNIN_USER, payload: { message: 'Respuesta inválida del servidor' } });
    }

    if (!dataUser.status) {
      return dispatch({ type: SIGNIN_USER, payload: { message: 'Error al Iniciar Sesión' } });
    }

    if (dataUser.data.data && dataUser.data.data.token) {
      console.log('data_user: ', dataUser.data.data.token);
      return dispatch({ type: SIGNIN_USER, payload: dataUser.data });
    } else {
      return dispatch({ type: SIGNIN_USER, payload: { message: 'Error al Iniciar Sesión' } });
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return dispatch({ type: SIGNIN_USER, payload: { message: 'Error al Iniciar Sesión' } });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const {data} = await axios.get('${BASE_URL}/user');
      dispatch({ type: GET_USERS, payload: data.data.users });
  } catch (error) {}
};

export const createInvoice = (input) => async (dispatch) => {
  try {
    console.log('data formik: ', input)
    const { data } = await axios.post('${BASE_URL}/contract', input);
    dispatch({ type: CREATE_INVOICE, payload: data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const createUser = (input) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "${BASE_URL}/auth/signup",
      input
    );
    dispatch({ type: CREATE_USER, payload: data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const incrementNumberFact = () => ({
  type: INCREMENT_NUMBER_FACT,
});

export const cleanDetail = () => {
  try {
    return {
      type: CLEAN_DETAIL,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchContractDetailsSuccess = (combinedData) => ({
  type: FETCH_CONTRACT_DETAILS_SUCCESS,
  payload: combinedData,
});

export const fetchContractDetailsFailure = (errorMessage) => ({
  type: FETCH_CONTRACT_DETAILS_FAILURE,
  payload: errorMessage,
});

export const fetchUserContracts = async (n_documento) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${n_documento}`);
    console.log("Response data:", response.data);
    
    const { Contracts, name_razonSocial } = response.data.data; 
    console.log("Contracts:", Contracts);
    console.log("name_razonSocial:", name_razonSocial); 
    
    const activeContracts = Contracts.filter(contract => contract.estado_contrato === "ACTIVO");
    return { contracts: activeContracts, name_razonSocial }; 
  } catch (error) {
    console.error("Error al obtener los contratos del usuario:", error);
    return { contracts: [], name_razonSocial: null }; 
  }
};

export const fetchLastReceiptNumber = () => async (dispatch) => {
  try {
    const response = await axios.get('${BASE_URL}/caja');
    const lastReceiptNumber = response.data.data[response.data.data.length - 1].receipt;
    console.log(lastReceiptNumber)

    const newReceipt = lastReceiptNumber + 1;

    dispatch({
      type: FETCH_LAST_RECEIPT_NUMBER_SUCCESS,
      payload: newReceipt
    });
  } catch (error) {
    console.error("Error al generar el número de recibo:", error);
    dispatch({
      type: FETCH_LAST_RECEIPT_NUMBER_FAILURE,
      payload: error.message 
    });
  }
};


export const fetchContractDetails = async (n_contrato) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/contract/${n_contrato}`
    );
    const { Plan, Delivery } = response.data.data; 

    return { Plan, municipio: Delivery.municipio, direccion: Delivery.direccion };
  } catch (error) {
    console.error("Error al obtener los detalles del contrato:", error);
    return {};
  }
};
