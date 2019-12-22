import { USER_AUTH, USER_RESET } from 'actions/userActions';
import createReducer from './createReducer';

const initialState = {
  name: 'querty'
};

const actionHandlers = {
  [USER_AUTH]: (state, { payload: name }) => {
    state.name = name;
  },
  [USER_RESET]: state => {
    state.name = null;
  }
};

export default createReducer(actionHandlers, initialState);
