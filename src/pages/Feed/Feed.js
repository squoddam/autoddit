import React, { useCallback } from 'react';
import { Layout, Button, Dropdown, Menu, List, Spin } from 'antd';

import styles from './Feed.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userReset } from 'actions/userActions';
import { postsVote } from 'actions/postsActions';
import { Post } from 'components';

const Feed = () => {
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.userStore);
  const postsStore = useSelector(state => state.postsStore);

  const handleScoreChange = useCallback(
    (id, change) => () => {
      dispatch(postsVote(id, change));
    },
    [dispatch]
  );

  return (
    <Spin spinning={postsStore.isLoading}>
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
          <Link to="new" className={styles.addBtnLink}>
            <Button type="primary" className={styles.addBtn}>
              Add
            </Button>
          </Link>
          <List
            itemLayout="horizontal"
            dataSource={postsStore.data.posts}
            renderItem={post => (
              <Post post={post} onScoreChange={handleScoreChange} />
            )}
          />
        </Layout.Content>
      </Layout>
    </Spin>
  );
};

export default Feed;
