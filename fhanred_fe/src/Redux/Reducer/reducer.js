import {
  SIGNIN_USER,
  CLEAN_DETAIL,
  CREATE_INVOICE,
  CREATE_USER,
  INCREMENT_NUMBER_FACT,
} from '../Actions/actions-types';

const initialState = {
  userInfo: {},
  numberFact: 1, // Inicializa el numero de la facturacion de Fhanred
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
    case CREATE_INVOICE:
      return {
        ...state,
      };
      case CREATE_USER:
      return {
        ...state,
      };
    case INCREMENT_NUMBER_FACT:
      return {
        ...state,
        numberFact: state.numberFact + 1,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        userInfo: {},
      };
    default:
      return state;
  }
};

export default rootReducer;
