import {
  POSTS_GET,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAIL
  // POSTS_ADD,
  // POSTS_ADD_SUCCESS,
  // POSTS_ADD_FAIL
} from 'actions/postsActions';
import createReducer from './createReducer';

const initialState = {
  isLoading: false,
  isInit: false,
  error: null,
  data: []
};

const actionHandlers = {
  [POSTS_GET]: state => {
    state.isInit = true;
    state.isLoading = true;
  },
  [POSTS_GET_SUCCESS]: (state, { payload: posts }) => {
    state.isLoading = false;
    state.data = posts;
  },
  [POSTS_GET_FAIL]: (state, { payload: error }) => {
    state.isLoading = false;
    state.error = error;
  }
  //   [POSTS_ADD]: (state) => {
  //     state.isLoading = true;
  //     state.isInit = true;
  //   }
};

export default createReducer(actionHandlers, initialState);
