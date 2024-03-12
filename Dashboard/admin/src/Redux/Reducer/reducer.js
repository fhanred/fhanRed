import {
  SIGNIN_USER,
  CREATE_USER,
  GET_USERS,
  CLEAN_DETAIL,
  LOGOUT_USER,
  ASSIGN_TASK_REQUEST,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_FAILURE,
} from "../Actions/actions-types";

const initialState = {
  authentication: {
    token: null,
    user: null,
    isAuthenticated: false,
  },
  userInfo: {},
  usersData: [],
  assign:[],
  loading:false,
 
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
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
    case CLEAN_DETAIL:
      return {
        ...state,
        userInfo: {},
        loginError: false,
      };
      case ASSIGN_TASK_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ASSIGN_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case ASSIGN_TASK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    
        default:
          return state;
      }
    };

export default rootReducer;
