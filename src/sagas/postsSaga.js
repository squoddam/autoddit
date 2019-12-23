import { put, takeLatest, select } from 'redux-saga/effects';
import mock from './serverMock';
import {
  postsGetSuccess,
  postsGetFail,
  POSTS_GET,
  postsAddSuccess,
  postsAddFail,
  POSTS_ADD,
  postsVoteSuccess,
  postsVoteFail,
  POSTS_VOTE
} from 'actions/postsActions';

function* postsGet({ payload: get = 5 }) {
  try {
    const postsStore = yield select(state => state.postsStore);

    const skip = postsStore.data.posts.length;

    const posts = yield mock.postsGetMock(skip, get);

    yield put(postsGetSuccess(JSON.parse(posts)));
  } catch (err) {
    yield put(postsGetFail(err));
  }
}

function* postsAdd(action) {
  try {
    const posts = yield mock.postsAddMock(action.payload);

    yield put(postsAddSuccess(JSON.parse(posts)));
  } catch (err) {
    yield put(postsAddFail(err));
  }
}

function* postsVote({ payload: { id, change } }) {
  try {
    yield mock.postsVote(id, change);

    yield put(postsVoteSuccess());
  } catch (err) {
    put(postsVoteFail(err));
  }
}

function* postsSaga() {
  yield takeLatest(POSTS_GET, postsGet);
  yield takeLatest(POSTS_ADD, postsAdd);
  yield takeLatest(POSTS_VOTE, postsVote);
}

export default postsSaga;
