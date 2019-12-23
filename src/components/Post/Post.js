import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styles from './Post.module.css';
import { Icon, Avatar, Button } from 'antd';
import Title from 'antd/lib/typography/Title';

const getAvatarProps = ({ imageSrc }) =>
  imageSrc
    ? {
        src: imageSrc
      }
    : {
        icon: <Icon type="link" />
      };

const Post = ({ post, onScoreChange, onAddComment }) => {
  const timeString = useMemo(
    () => dayjs(post.createdAt).format('MMM DD, YYYY HH:MM'),
    [post.createdAt]
  );

  return (
    <div className={styles.post}>
      <div className={styles.score}>
        <Icon type="caret-up" onClick={onScoreChange(post.id, 1)} />
        <div className={post.score < 0 ? styles.postNegativeScore : ''}>
          {post.score}
        </div>
        <Icon type="caret-down" onClick={onScoreChange(post.id, -1)} />
      </div>
      <div className={styles.image}>
        <Avatar {...getAvatarProps(post)} shape="square" size={68} />
      </div>
      <div className={styles.content}>
        <a target="_blank" href={post.url} rel="noopener noreferrer">
          <Title level={4}>{post.title}</Title>
        </a>
        <div className={styles.createdAt}>{timeString}</div>
        <div className={styles.commentSection}>
          <div className={styles.commentsCount}>
            {post.commentsCount} comments
            <Button type="link" onClick={onAddComment(post.id)}>
              Add comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
// Submitted on MMM dd, YYYY HH:MM
