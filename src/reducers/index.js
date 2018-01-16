import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RequestReducer from './RequestReducer';
import LovedOneReducer from './LovedOneReducer';

export default combineReducers({
  auth: AuthReducer,
  request: RequestReducer,
  lovedOne: LovedOneReducer
});
