import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

const INITIAL_STATE = {};
const middleware = ReduxThunk;

const configureStore = (initialState = INITIAL_STATE) => (
  createStore(
    reducers,
    initialState,
    applyMiddleware(middleware),
  )
);

export default configureStore;
