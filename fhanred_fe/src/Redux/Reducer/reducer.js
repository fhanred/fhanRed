import {
  SIGNIN_USER,
  CREATE_USER,
  GET_USERS,
  INCREMENT_NUMBER_FACT,
  CLEAN_DETAIL,
  FETCH_USER_CONTRACTS_SUCCESS,
  FETCH_CONTRACT_DETAILS_REQUEST,
  FETCH_CONTRACT_DETAILS_SUCCESS,
  FETCH_CONTRACT_DETAILS_FAILURE,
  FETCH_LAST_RECEIPT_NUMBER_SUCCESS,
  FETCH_LAST_RECEIPT_NUMBER_FAILURE,
  FETCH_SUMMARY_REQUEST,
  FETCH_SUMMARY_SUCCESS,
  FETCH_SUMMARY_FAILURE,
  LOGOUT_USER,
  CLEAN_CONTRACT_DETAILS,
  SEND_PAYMENT_REQUEST,
  SEND_PAYMENT_SUCCESS,
  SEND_PAYMENT_FAILURE,
} from "../Actions/actions-types";

const initialState = {
  authentication: {
    token: null,
    user: null,
    isAuthenticated: false,
  },
  userInfo: {},
  usersData: [],
  numberFact: 1,
  userContracts: [],
  selectedContract: null,
  planDetails: null,
  lastReceiptNumber: null,
  summary: {
    
      userInfo: {},
      saldo: null,
      bills: [],
      debitNotes: [],
      creditNotes: [],
      cash: [],
      loading: false,
      error: null,
    
  },
  paymentDetails: null,
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      console.log('Usuario logueado:', action.payload.user);
      return {
        ...state,
        authentication: {
          token: action.payload.token,
          user: action.payload.user,
          isAuthenticated: true,
        },
      
      };
    case LOGOUT_USER:
      return {
        ...state,
        userInfo: action.payload,
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
    case INCREMENT_NUMBER_FACT:
      return {
        ...state,
        numberFact: state.numberFact + 1,
      };

    case FETCH_LAST_RECEIPT_NUMBER_SUCCESS:
      return {
        ...state,
        lastReceiptNumber: action.payload,
      };
    case FETCH_LAST_RECEIPT_NUMBER_FAILURE:
      return {
        ...state,
        error: action.payload,
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
    case FETCH_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUMMARY_SUCCESS:
      console.log("FETCH_SUMMARY_SUCCESS - Payload:", action.payload);
      console.log("FETCH_SUMMARY_SUCCESS - Summary Data:", action.payload);
      return {
        ...state,
        summary: action.payload,
      };
    case FETCH_SUMMARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAN_CONTRACT_DETAILS:
      return {
        ...state,
        contractDetails: null,
      };
    case SEND_PAYMENT_REQUEST:
      return { ...state, loading: true, error: null, paymentDetails: null };
    case SEND_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentDetails: action.payload.newIngreso,
      };
    case SEND_PAYMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
     
    default: 
      return state;
  }
};

export default rootReducer;
