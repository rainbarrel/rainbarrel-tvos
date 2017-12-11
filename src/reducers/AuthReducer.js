import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CONFIRMATION,
  LOGIN_USER_ATTEMPT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGNUP_USER_ATTEMPT,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirmation: '',
  loading: false,
  error: '',
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_EMAIL:
      return { ...state, email: action.payload, error: '' };
    case CHANGE_PASSWORD:
      return { ...state, password: action.payload, error: '' };
    case CHANGE_PASSWORD_CONFIRMATION:
      return { ...state, passwordConfirmation: action.payload };
    case LOGIN_USER_ATTEMPT:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAILURE:
      return { ...INITIAL_STATE, error: 'Authentication Failed' };
    case SIGNUP_USER_ATTEMPT:
      return { ...state, loading: true, error: '' };
    case SIGNUP_USER_SUCCESS:
      return { ...INITIAL_STATE, user: action.payload };
    case SIGNUP_USER_FAILURE:
      return { ...INITIAL_STATE, error: action.payload };
    default:
      return state;
  }
};
