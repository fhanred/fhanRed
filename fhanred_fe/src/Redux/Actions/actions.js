import axios from 'axios';
import { SIGNIN_USER, CLEAN_DETAIL } from './actions-types';

export const userInfo = (input) => async (dispatch) => {
  try {
    const dataUser = await axios.post('http://localhost:3001/user/...', input);
    return dispatch({ type: SIGNIN_USER, payload: dataUser.data });
  } catch (error) {
    throw new Error('Correo Electronio o contraseña invalidos');
  }
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
