import BASE_URL from "../../Config";

import axios from "axios";
import {
  SIGNIN_USER,
  LOGOUT_USER,
  CLEAN_DETAIL,
  CREATE_USER,
  GET_USERS,
  FETCH_ASSIGNED_TASKS_REQUEST,
  FETCH_ASSIGNED_TASKS_SUCCESS,
  FETCH_ASSIGNED_TASKS_FAILURE,
  ASSIGN_TASK_TO_USER_REQUEST,
  ASSIGN_TASK_TO_USER_SUCCESS,
  ASSIGN_TASK_TO_USER_FAILURE,
  // DELETE_USER_FAILURE,
  // DELETE_USER_SUCCESS,
  // DELETE_USER_REQUEST,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  
} from "./actions-types";

export const signInUser = (token, user) => ({
  type: SIGNIN_USER,
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
    return { success: true }; 
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};

// Acción para eliminar un usuario
// export const deleteUser = (n_documento) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_USER_REQUEST });
//     await axios.delete(`${BASE_URL}/user/${n_documento}`);
//     dispatch({ type: DELETE_USER_SUCCESS });
//     return { success: true }; 
//   } catch (error) {
//     dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
//     return { success: false, errorMessage: error.message };
//   }
// };

// Acción para actualizar un usuario
// export const updateUser = (n_documento, user) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_USER_REQUEST });
//     const { data } = await axios.put(`${BASE_URL}/user/update/${n_documento}`, user);
   
//     dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
//     dispatch(getUsers(n_documento));
//     console.log(data,"probando updateAccion")
//     return { success: true }; 
//   } catch (error) {
//     dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
//     return { success: false, errorMessage: error.message };
//   }
// };

export const updateUser = (n_documento, user) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const { data } = await axios.put(`${BASE_URL}/user/update/${n_documento}`, user);
   
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    dispatch(getUsers(n_documento));
    console.log(data, "probando updateAccion");
    return { success: true }; 
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.response.data.message }); // Ajusta aquí para obtener el mensaje de error del objeto de respuesta
    return { success: false, errorMessage: error.message };
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

export const fetchAssignedTasks = (n_documento = null) => async (dispatch) => {
  dispatch({ type: FETCH_ASSIGNED_TASKS_REQUEST });
  try {
    let url = `${BASE_URL}/task/listarTareas/`;
    if (n_documento) {
      url = `${BASE_URL}/task/listarTareas/${n_documento}`;
    }
    const response = await axios.get(url);
    console.log("Response from fetchAssignedTasks:", response.data);
    dispatch({ type: FETCH_ASSIGNED_TASKS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error in fetchAssignedTasks:", error);
    dispatch({ type: FETCH_ASSIGNED_TASKS_FAILURE, payload: error.message });
  }
};
export const assignTaskToUser = (taskId, n_documento, turno, taskDate) => async (dispatch) => {
  dispatch({ type: ASSIGN_TASK_TO_USER_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/tasks/asignar`, {
      taskId,
      n_documento,
      turno,
      taskDate,
    });
    console.log("Response from assignTaskToUser:", response.data);
    dispatch({ type: ASSIGN_TASK_TO_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ASSIGN_TASK_TO_USER_FAILURE, payload: error.message });
  }
};




 
