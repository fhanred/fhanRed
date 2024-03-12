import BASE_URL from "../../Config";

import axios from "axios";
import {
  SIGNIN_USER,
  LOGOUT_USER,
  CLEAN_DETAIL,
  CREATE_USER,
  GET_USERS,
  ASSIGN_TASK_REQUEST,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_FAILURE,
  
} from "./actions-types";

export const signInUser = (token, user) => ({
  type: "SIGNIN_USER",
  payload: { token, user },
});

export const userInfo = (input) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, input);

    if (response.data.data && response.data.data.token) {
      const { token, user } = response.data.data;
      
      // Almacenar el token en el estado global de Redux
      dispatch(signInUser(token, user));
    } else {
      
    }
    console.log('Resultado de la solicitud:', response.data);
  } catch (error) {
    console.error('Error en la solicitud:', error);
    
    return dispatch(cleanDetail());
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



export const createUser = (input) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/signup`, input);
    dispatch({ type: CREATE_USER, payload: data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
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

export const assignTask = (taskId, userId, turno, taskDate) => async (dispatch) => {
  dispatch({ type: ASSIGN_TASK_REQUEST });

  try {
    const response = await axios.post(`${BASE_URL}task/asignar`, {
      taskId,
      userId,
      turno,
      taskDate,
    });

    dispatch({ type: ASSIGN_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error al asignar la tarea:', error);

    dispatch({ type: ASSIGN_TASK_FAILURE, payload: error.message });
  }
};



 
