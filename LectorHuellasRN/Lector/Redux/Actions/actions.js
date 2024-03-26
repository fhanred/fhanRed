import BASE_URL from "../../Ruta";

import axios from "axios";
import {
  SIGNIN_USER,
  LOGOUT_USER,
  GET_USERS,
  CLEAN_DETAIL,
  FETCH_USER_CONTRACTS_REQUEST,
  FETCH_USER_CONTRACTS_SUCCESS,
  FETCH_USER_CONTRACTS_FAILURE,
  FETCH_CONTRACT_DETAILS_REQUEST,
  FETCH_CONTRACT_DETAILS_SUCCESS,
  FETCH_CONTRACT_DETAILS_FAILURE,
  CLEAN_CONTRACT_DETAILS,  
  CLEAN_USER_CONTRACTS,
  SHOW_NO_CONTRACTS_MODAL,
  CLOSE_MODAL,
  CREATE_CONTRACT_REQUEST,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_FAILURE,
  SAVE_FINGERPRINT 

} from "./actions-types";

export const signInUser = (token, user) => ({
  type: SIGNIN_USER,
  payload: { token, user },
});

export const userInfo = (input) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, input);

    if (response.data.data && response.data.data.token && response.data.data.user) {
      const { token, user } = response.data.data;
      dispatch(signInUser(token, user)); 
    } else {
      
    }

    console.log('Resultado de la solicitud:', response.data);
  } catch (error) {
    console.error('Error en la solicitud:', error);
    dispatch(cleanDetail());
  }
};

export const saveFingerprint = (userId, fingerprintData) => async (dispatch) => {
  try {
   
    const response = await axios.post(`${BASE_URL}/save-fingerprint`, {
      userId,
      fingerprintData,
    });
    
    
    dispatch({ type: SAVE_FINGERPRINT, payload: response.data });
  } catch (error) {
    
    console.error('Error al guardar la huella digital:', error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    const userLogout = { message: "User is logout" };
    dispatch({ type: LOGOUT_USER, payload: userLogout });
    dispatch(cleanDetail());
    console.log("Mensaje de cierre de sesión:", userLogout);
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/user`);
    dispatch({ type: GET_USERS, payload: data.data.users });
  } catch (error) {}
};

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

    const activeContracts = Contracts.filter(
      (contract) => contract.estado_contrato === "ACTIVO"
    );
    return { contracts: activeContracts, name_razonSocial };
  } catch (error) {
    console.error("Error al obtener los contratos del usuario:", error);
    return { contracts: [], name_razonSocial: null };
  }
};

export const fetchUserContractsAction = (n_documento) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${n_documento}`);
    console.log("Response data:", response.data);

    const { Contracts, name_razonSocial } = response.data.data;

    // Verificar si hay contratos
    if (Contracts && Contracts.length > 0) {
      const { Delivery } = Contracts[0];
      console.log(Delivery);
      console.log("Contracts:", Contracts);
      console.log("name_razonSocial:", name_razonSocial);

      const activeContracts = Contracts.filter(
        (contract) => contract.estado_contrato === "ACTIVO"
      );
      console.log({ activeContracts });

      dispatch({ type: FETCH_USER_CONTRACTS_SUCCESS, payload: activeContracts });
    } else {
      // Si no hay contratos, mostrar modal o realizar otra acción
      // Ejemplo:
      dispatch(showNoContractsModal());
    }
  } catch (error) {
    console.error("Error al obtener los contratos del usuario:", error);
    return { contracts: [], name_razonSocial: null };
  }
};

export const cleanUserContracts = () => ({
  type: "CLEAN_USER_CONTRACTS",
});

export const showNoContractsModal = () => ({
  type: 'SHOW_NO_CONTRACTS_MODAL',
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});


export const fetchContractDetails = async (n_contrato) => {
  try {
    const response = await axios.get(`${BASE_URL}/contract/${n_contrato}`);
    const { Plan, Delivery } = response.data.data;

    return {
      Plan,
      municipio: Delivery.municipio,
      direccion: Delivery.direccion,
    };
  } catch (error) {
    console.error("Error al obtener los detalles del contrato:", error);
    return {};
  }
};
export const cleanContract = () => ({
  type: CLEAN_CONTRACT_DETAILS,
});


export const createContractRequest = () => ({
  type: CREATE_CONTRACT_REQUEST,
});

export const createContractSuccess = (contractRoute) => ({
  type: CREATE_CONTRACT_SUCCESS,
  payload: contractRoute,
});

export const createContractFailure = (error) => ({
  type: CREATE_CONTRACT_FAILURE,
  payload: error,
});

export const createContract = (contractData) => {
  return async (dispatch) => {
    console.log('Datos del contrato que se van a enviar al backend:', contractData);
    dispatch(createContractRequest());
    try {
      const response = await axios.post(`${BASE_URL}/contract/create`, contractData);
      const contractId = response.data.n_contrato; // Suponiendo que el servidor devuelve el ID del contrato
      const contractRoute = `/contract/${contractId}`; // Suponiendo que la ruta del contrato se forma así
      dispatch(createContractSuccess(contractRoute));
    } catch (error) {
      dispatch(createContractFailure(error.message));
    }
  };
};

