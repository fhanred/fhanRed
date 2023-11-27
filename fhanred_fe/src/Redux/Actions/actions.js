import axios from 'axios';
import {
  SIGNIN_USER,
  CLEAN_DETAIL,
  CREATE_INVOICE,
  INCREMENT_NUMBER_FACT,
  CREATE_USER,
  GET_USERS,
} from './actions-types';

export const userInfo = (input) => async (dispatch) => {
  try {
    const dataUser = await axios.post('http://localhost:3001/...', input);
    return dispatch({ type: SIGNIN_USER, payload: dataUser.data });
  } catch (error) {}
};

export const getUsers = () => async (dispatch) => {
  try {
    const {data} = await axios.get('http://localhost:3001/user');
      dispatch({ type: GET_USERS, payload: data.data.users });
   
  } catch (error) {}
};

export const createInvoice = (input) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:3001/contract', input);
    dispatch({ type: CREATE_INVOICE, payload: data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const createUser = (input) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:3001/user', input);
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
