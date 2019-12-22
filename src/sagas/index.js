import { all } from 'redux-saga/effects';

import postsGetSaga from './postsGetSaga';

export default function* rootSaga() {
  yield all([postsGetSaga()]);
}
