import {
  SIGNIN_USER,
  GET_USERS,
  CLEAN_DETAIL,
  FETCH_USER_CONTRACTS_SUCCESS,
  FETCH_CONTRACT_DETAILS_REQUEST,
  FETCH_CONTRACT_DETAILS_SUCCESS,
  FETCH_CONTRACT_DETAILS_FAILURE,
  LOGOUT_USER,
  CLEAN_CONTRACT_DETAILS,
  CLEAN_USER_CONTRACTS,
  SHOW_NO_CONTRACTS_MODAL,
  CLOSE_MODAL,
  ADD_RECEIPT,
  CREATE_CONTRACT_REQUEST,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_FAILURE,
  SAVE_FINGERPRINT

} from "../Actions/actions-types";

const initialState = {
  authentication: {
    token: null,
    user: null,
    isAuthenticated: false,
  },
  fingerprintSaved: false,
  fingerprintError: null,
  contractRoute: null,
  userInfo: {},
  usersData: [],
  userContracts: [],
  selectedContract: null,
  planDetails: null,
  isNoContractsModalOpen: false,
  loading: false,
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
        userInfo: {}, 
      };
    case GET_USERS:
      return {
        ...state,
        usersData: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        userInfo: {},
        loginError: false,
      };
      case SAVE_FINGERPRINT:  
      return {
        ...state,
        fingerprintSaved: true,
        fingerprintError: null,
      };
  
    case FETCH_CONTRACT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_USER_CONTRACTS_SUCCESS:
      return {
        ...state,
        userContracts: action.payload,
        loading: false,
      };

    case FETCH_CONTRACT_DETAILS_SUCCESS:
      return {
        ...state,
        planDetails: action.payload,
        loading: false,
      };
    case FETCH_CONTRACT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAN_USER_CONTRACTS:
      console.log("CLEAN_USER_CONTRACTS action dispatched");
      return {
        ...state,
        userContracts: [],
      };
    case SHOW_NO_CONTRACTS_MODAL:
      return {
        ...state,
        isNoContractsModalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isNoContractsModalOpen: false,
      };
  
    case CLEAN_CONTRACT_DETAILS:
      return {
        ...state,
        contractDetails: null,
      };

     case CREATE_CONTRACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CONTRACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contractRoute: action.payload,
        error: '',
      };
    case CREATE_CONTRACT_FAILURE:
      return {
        ...state,
        loading: false,
        contractRoute: null,
        error: action.payload,
      };
        default:
          return state;
      }
    };

export default rootReducer;
