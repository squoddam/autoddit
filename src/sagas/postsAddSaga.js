import { put, takeLatest } from 'redux-saga/effects';
import mock from './serverMock';
import { postsAddSuccess, postsAddFail, POSTS_ADD } from 'actions/postsActions';

function* postsAdd(action) {
  try {
    const posts = yield mock.postsAddMock(action.payload);

    yield put(postsAddSuccess(posts));
  } catch (err) {
    yield put(postsAddFail(err));
  }
}

function* postsAddSaga() {
  yield takeLatest(POSTS_ADD, postsAdd);
}

export default postsAddSaga;
