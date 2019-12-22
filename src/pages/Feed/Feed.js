import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Dropdown, Menu } from 'antd';

import styles from './Feed.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userReset } from 'actions/userActions';

const Feed = () => {
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.userStore);

  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => dispatch(userReset())}>
                Log Out
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="link" className={styles.user}>
            {userStore.name}
          </Button>
        </Dropdown>
      </Layout.Header>
      <Layout.Content className={styles.content}>
        <Link to="new">
          <Button type="primary">Add</Button>
        </Link>
      </Layout.Content>
    </Layout>
  );
};

export default Feed;
