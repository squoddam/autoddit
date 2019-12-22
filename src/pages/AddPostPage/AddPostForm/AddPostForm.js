import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo
} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Avatar, Spin, Button } from 'antd';

import styles from './AddPostForm.module.css';
import produce from 'immer';
import Title from 'antd/lib/typography/Title';

const REGEX_URL = /(?:www\.|(?!www)[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const rules = {
  required: {
    isFailed: v => v.length === 0,
    message: 'Please, enter URL!'
  },
  isUrl: {
    isFailed: v => !REGEX_URL.test(v),
    message: 'It should be a valid URL'
  }
};

const validateUrl = url =>
  [rules.required, rules.isUrl].find(
    rule => rule.isFailed(url) && rule.message
  );

const AddPostForm = ({ onSubmit, onCancel }) => {
  const [url, setUrl] = useState({
    error: null,
    value: '',
    isTouched: false
  });

  const [meta, setMeta] = useState({
    loaded: false,
    isLoading: false,
    title: null,
    imageSrc: null
  });

  const handleUrlChange = e => {
    const { value } = e.target;

    const error = validateUrl(value);

    setUrl(
      produce(state => {
        state.isTouched = true;
        state.error = error ? error.message : null;
        state.value = value;
      })
    );
  };

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (url.isTouched && !url.error) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setMeta(
          produce(state => {
            state.isLoading = true;
            state.loaded = false;
          })
        );

        fetch('https://cors-anywhere.herokuapp.com/' + url.value, {
          headers: {
            'Content-Type': 'text/html'
          }
        })
          .then(res => res.text())
          .then(htmlString => {
            const doc = new DOMParser().parseFromString(
              htmlString,
              'text/html'
            );

            const title = (
              doc.querySelector('meta[property="og:description"]') ||
              doc.querySelector('meta[property="twitter:description"]') ||
              {}
            ).content;
            const imageSrc = (
              doc.querySelector('meta[property="og:image"]') ||
              doc.querySelector('meta[property="twitter:image"]') ||
              {}
            ).content;

            setMeta({
              loaded: true,
              isLoading: false,
              title: title || url.value,
              imageSrc: imageSrc || null
            });
          });
      }, 500);
    }
  }, [url.error, url.isTouched, url.value]);

  const avatarProps = useMemo(
    () =>
      meta.imageSrc
        ? {
            src: meta.imageSrc
          }
        : {
            icon: <Icon type="link" />
          },
    [meta.imageSrc]
  );

  const handleSubmit = useCallback(() => {
    onSubmit({ url, ...meta });
  }, [meta, onSubmit, url]);

  return (
    <Spin spinning={meta.isLoading}>
      <div className={styles.form}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Avatar {...avatarProps} shape="square" size={200} />
          </div>
          <div className={styles.contentEntry}>
            <Title className={!meta.title && styles.titleDisabled}>
              {meta.title || 'No Title Yet'}
            </Title>
            <div className={styles.urlInput}>
              <Form.Item
                label="Your URL"
                colon={false}
                validateStatus={
                  url.isTouched && url.error ? 'error' : 'validating'
                }
                help={(url.isTouched && url.error) || ''}
              >
                <Input
                  placeholder="Enter URL here..."
                  onChange={handleUrlChange}
                  disabled={meta.isLoading}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={styles.btnsContainer}>
          <Button className={styles.btn} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className={styles.btn}
            type="primary"
            disabled={!url.isTouched || !meta.loaded || url.error}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </Spin>
  );
};

AddPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default AddPostForm;
