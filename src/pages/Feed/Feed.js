import React, { useCallback, useState } from 'react';
import { Layout, Button, Dropdown, Menu, List, Spin, Modal } from 'antd';

import styles from './Feed.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userReset } from 'actions/userActions';
import { postsVote, postsGet } from 'actions/postsActions';
import { Post } from 'components';
import AddCommentModal from 'components/AddCommentModal/AddCommentModal';

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

  const [idForModal, setIdForModal] = useState(null);

  const handleOpenModal = useCallback(id => () => setIdForModal(id), []);
  const handleCloseModal = useCallback(() => setIdForModal(null), []);

  const handleLoadMore = useCallback(() => dispatch(postsGet()), [dispatch]);

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
              <Post
                post={post}
                onScoreChange={handleScoreChange}
                onAddComment={handleOpenModal}
              />
            )}
            loadMore={
              !postsStore.isLoading &&
              !postsStore.isFull && (
                <div className={styles.loadMoreContainer}>
                  <Button onClick={handleLoadMore}>Load more</Button>
                </div>
              )
            }
          />
        </Layout.Content>
      </Layout>
      <AddCommentModal
        visible={idForModal !== null}
        onCancel={handleCloseModal}
      />
    </Spin>
  );
};

export default Feed;
