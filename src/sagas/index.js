import { all } from 'redux-saga/effects';

import postsGetSaga from './postsGetSaga';
import postsAddSaga from './postsAddSaga';

export default function* rootSaga() {
  yield all([postsGetSaga(), postsAddSaga()]);
}
