import { USER_AUTH } from 'actions/userActions';
import createReducer from './createReducer';

const initialState = {
  name: null
};

const actionHandlers = {
  [USER_AUTH]: (state, { payload: name }) => {
    state.name = name;
  }
};

export default createReducer(actionHandlers, initialState);
