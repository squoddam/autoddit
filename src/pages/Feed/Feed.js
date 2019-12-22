import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';

import styles from './Feed.module.css';
import { Link } from 'react-router-dom';

const Feed = props => {
  return (
    <Layout>
      <Layout.Content className={styles.content}>
        <Link to="new">
          <Button type="primary">Add</Button>
        </Link>
      </Layout.Content>
    </Layout>
  );
};

export default Feed;
