import { CHANGE_LOVED_ONES } from '../actions/types';

const INITIAL_STATE = { lovedOnes: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOVED_ONES:
      return { ...state, lovedOnes: action.payload };
    default:
      return state;
  }
};
