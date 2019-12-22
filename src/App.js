import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'antd';
import { postsGet } from 'actions/postsActions';

function App() {
  const dispatch = useDispatch();
  const postsStore = useSelector(state => state.postsStore);

  useEffect(() => {
    if (!postsStore.isInit) {
      dispatch(postsGet());
    }
  }, [dispatch, postsStore.isInit]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button type="primary">HI!</Button>
      </header>
    </div>
  );
}

export default App;
