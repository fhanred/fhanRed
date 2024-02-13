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
    console.log('input: ', input)
    const dataUser = await axios.post('http://localhost:3001/auth/login', input);
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
    const {data} = await axios.get('http://localhost:3001/user');
      dispatch({ type: GET_USERS, payload: data.data.users });
  } catch (error) {}
};

export const createInvoice = (input) => async (dispatch) => {
  try {
    console.log('data formik: ', input)
    const { data } = await axios.post('http://localhost:3001/contract', input);
    dispatch({ type: CREATE_INVOICE, payload: data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const createUser = (input) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:3001/auth/signup', input);
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
