import { SIGNIN_USER, CLEAN_DETAIL, CREATE_INVOICE } from '../Actions/actions-types';

const initialState = {
  userInfo: {},
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
        }
    case CLEAN_DETAIL:
      return {
        ...state,
        userInfo: {},
      };
    default:
      return state;
  }
};

export default rootReducer
