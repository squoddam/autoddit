import React from 'react';
import { Layout, Button, Dropdown, Menu, List, Avatar, Spin } from 'antd';

import styles from './Feed.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userReset } from 'actions/userActions';
import Title from 'antd/lib/typography/Title';

const getAvatarProps = ({ imageSrc }) =>
  imageSrc
    ? {
        src: imageSrc
      }
    : {
        type: 'link'
      };

const Feed = () => {
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.userStore);
  const postsStore = useSelector(state => state.postsStore);

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
            renderItem={item => (
              <div className={styles.item}>
                <div className={styles.score}></div>
                <div className={styles.image}>
                  <Avatar {...getAvatarProps(item)} shape="square" size={68} />
                </div>
                <div className={styles.itemContentContainer}>
                  <a target="_blank" href={item.url} rel="noopener noreferrer">
                    <Title level={4} className={styles.title}>
                      {item.title}
                    </Title>
                  </a>
                  <div className={styles.createdAt}>{item.createdAt}</div>
                  <div className={styles.commentsCount}>
                    {item.commentsCount} comments
                  </div>
                </div>
              </div>
            )}
          />
        </Layout.Content>
      </Layout>
    </Spin>
  );
};

export default Feed;
