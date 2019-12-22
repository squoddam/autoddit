import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import styles from './PageLayout.module.css';

const PageLayout = ({ children }) => {
  return <Layout className={styles.layout}>{children}</Layout>;
};

export default PageLayout;
