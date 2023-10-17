import { SIGNIN_USER, CLEAN_DETAIL } from '../Actions/actions-types';

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
