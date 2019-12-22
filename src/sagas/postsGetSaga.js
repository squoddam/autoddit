import { put, takeLatest } from 'redux-saga/effects';
import mock from './serverMock';
import { postsGetSuccess, postsGetFail, POSTS_GET } from 'actions/postsActions';

function* postsGet() {
  try {
    const posts = yield mock.postsGetMock();

    yield put(postsGetSuccess(posts));
  } catch (err) {
    yield put(postsGetFail(err));
  }
}

function* postsGetSaga() {
  yield takeLatest(POSTS_GET, postsGet);
}

export default postsGetSaga;
