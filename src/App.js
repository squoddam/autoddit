import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { postsGet } from 'actions/postsActions';
import { Feed, AddPostPage } from 'pages';

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
      <Switch>
        <Route exact path="/" component={Feed} />

        <Route exact path="/new" component={AddPostPage} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
