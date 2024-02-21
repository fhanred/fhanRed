import {
  SIGNIN_USER,
  CREATE_USER,
  GET_USERS,
  INCREMENT_NUMBER_FACT,
  CLEAN_DETAIL,
  FETCH_USER_CONTRACTS_REQUEST,
  FETCH_USER_CONTRACTS_SUCCESS,
  FETCH_USER_CONTRACTS_FAILURE,
  FETCH_CONTRACT_DETAILS_REQUEST,
  FETCH_CONTRACT_DETAILS_SUCCESS,
  FETCH_CONTRACT_DETAILS_FAILURE,
  FETCH_LAST_RECEIPT_NUMBER,
  FETCH_LAST_RECEIPT_NUMBER_SUCCESS,
  FETCH_LAST_RECEIPT_NUMBER_FAILURE,
  LOGOUT_USER
} from '../Actions/actions-types';

const initialState = {
  userInfo: {},
  usersData: [],
  numberFact: 1,
  userContracts: [],
  selectedContract: null,
  planDetails: null,
  loading: false,
  error: null,
  lastReceiptNumber: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return {
        ...state,
        userInfo: action.payload,
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
        userInfo: {}
      }
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
      case FETCH_USER_CONTRACTS_REQUEST:
      case FETCH_CONTRACT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_USER_CONTRACTS_REQUEST:
        case FETCH_CONTRACT_DETAILS_REQUEST:
          return {
            ...state,
            loading: true,
            error: null
          };
    
        case FETCH_USER_CONTRACTS_SUCCESS:
          return {
            ...state,
            userContracts: action.payload,
            loading: false
          };
    
        case FETCH_CONTRACT_DETAILS_SUCCESS:
          return {
            ...state,
            planDetails: action.payload,
            loading: false
          };
          case FETCH_CONTRACT_DETAILS_FAILURE:
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





