import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Dropdown, Menu, List } from 'antd';

import styles from './Feed.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userReset } from 'actions/userActions';

const Feed = () => {
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.userStore);
  const postsStore = useSelector(state => state.postsStore);

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
        <List
          itemLayout="horizontal"
          dataSource={postsStore.data.posts}
          renderItem={item => <div>{item.title}</div>}
        />
      </Layout.Content>
    </Layout>
  );
};

export default Feed;
