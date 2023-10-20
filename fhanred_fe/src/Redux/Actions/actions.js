import axios from 'axios';
import { SIGNIN_USER, CLEAN_DETAIL, CREATE_INVOICE } from './actions-types';

export const userInfo = (input) => async (dispatch) => {
  try {
    const dataUser = await axios.post('http://localhost:3001/user/...', input);
    return dispatch({ type: SIGNIN_USER, payload: dataUser.data });
  } catch (error) {}
};

export const createInvoice = (input) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:3001/...', input);
    return dispatch({ type: CREATE_INVOICE, payload: data });
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
