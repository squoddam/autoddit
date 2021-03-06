import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { postsGet } from 'actions/postsActions';
import { AuthPage, Feed, AddPostPage } from 'pages';
import { AuthCheck } from 'components';

function App() {
  const dispatch = useDispatch();
  const postsStore = useSelector(state => state.postsStore);

  useEffect(() => {
    if (!postsStore.isInit) {
      dispatch(postsGet());
    }
  }, [dispatch, postsStore.isInit]);

  return (
    <Router>
      <AuthCheck>
        <Switch>
          <Route exact path="/" component={Feed} />

          <Route exact path="/new" component={AddPostPage} />

          <Route exact path="/auth" component={AuthPage} />

          <Redirect to="/" />
        </Switch>
      </AuthCheck>
    </Router>
  );
}

export default App;
