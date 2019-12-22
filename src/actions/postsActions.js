export const POSTS_GET = 'POSTS_GET';
export const POSTS_GET_SUCCESS = 'POSTS_GET_SUCCESS';
export const POSTS_GET_FAIL = 'POSTS_GET_FAIL';
export const POSTS_ADD = 'POSTS_ADD';
export const POSTS_ADD_SUCCESS = 'POSTS_ADD_SUCCESS';
export const POSTS_ADD_FAIL = 'POSTS_ADD_FAIL';

export const postsGet = () => ({
  type: POSTS_GET
});

export const postsGetSuccess = posts => ({
  type: POSTS_GET_SUCCESS,
  payload: posts
});

export const postsGetFail = err => ({
  type: POSTS_GET_FAIL,
  payload: err
});

export const postsAdd = post => ({
  type: POSTS_ADD,
  payload: post
});

export const postsAddSuccess = posts => ({
  type: POSTS_ADD_SUCCESS,
  payload: posts
});

export const postsAddFail = err => ({
  type: POSTS_ADD_FAIL,
  payload: err
});
