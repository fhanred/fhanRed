import {
  SIGNIN_USER,
  CREATE_USER,
  GET_USERS,
  CLEAN_DETAIL,
  LOGOUT_USER,
  FETCH_ASSIGNED_TASKS_REQUEST,
  FETCH_ASSIGNED_TASKS_SUCCESS,
  FETCH_ASSIGNED_TASKS_FAILURE,
  ASSIGN_TASK_TO_USER_REQUEST,
  ASSIGN_TASK_TO_USER_SUCCESS,
  ASSIGN_TASK_TO_USER_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE
} from "../Actions/actions-types";

const initialState = {
  authentication: {
    token: null,
    user: null,
    isAuthenticated: false,
  },
  userInfo: {},
  usersData: [],
  assign: {}, 
  tasks: [],
  loading: false,
  deleting:false,
  
  updating: false,
  error: null, 
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      console.log("Usuario logueado:", action.payload.user);
      return {
        ...state,
        authentication: {
          token: action.payload.token,
          user: action.payload.user,
          isAuthenticated: true,
        },
        cashierName: action.payload.user.cashierName,
      };
      case LOGOUT_USER:
        return {
          ...state,
          authentication: {
            token: null,
            user: null,
            isAuthenticated: false,
          },
          userInfo: {}, 
        };
    case GET_USERS:
      return {
        ...state,
        usersData: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
      case DELETE_TASK_REQUEST:
        console.log("DELETE_TASK_REQUEST")
      return {
        ...state,
        deleting: true,
        error: null
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleting: false,
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.payload
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        updating: true,
        error: null
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updating: false,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.payload
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        userInfo: {},
        loginError: false,
      };
      case FETCH_ASSIGNED_TASKS_REQUEST:
        console.log("FETCH_ASSIGNED_TASKS_REQUEST");
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ASSIGNED_TASKS_SUCCESS:
      console.log("FETCH_ASSIGNED_TASKS_SUCCESS", action.payload);
      return {
        ...state,
        assign: action.payload,
        loading: false,
      };
    case FETCH_ASSIGNED_TASKS_FAILURE:
      console.log("FETCH_ASSIGNED_TASKS_FAILURE", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ASSIGN_TASK_TO_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ASSIGN_TASK_TO_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ASSIGN_TASK_TO_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case GET_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload // Actualiza el estado con las tareas obtenidas
      };
    case GET_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
export default rootReducer;