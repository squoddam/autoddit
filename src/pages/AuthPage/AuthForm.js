import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';

import styles from './AuthPage.module.css';
import Title from 'antd/lib/typography/Title';
import produce from 'immer';

const rules = {
  required: {
    isFailed: v => v.length === 0,
    message: 'Please, enter URL!'
  },
  max: maxLength => ({
    isFailed: v => v.length > maxLength,
    message: `Sorry, no names longer than ${maxLength} :\\`
  })
};

const validateName = name =>
  [rules.required, rules.max(12)].find(
    rule => rule.isFailed(name) && rule.message
  );

const AuthForm = ({ onSubmit }) => {
  const [name, setName] = useState({
    error: null,
    value: '',
    isTouched: false
  });

  const handleNameChange = e => {
    const { value } = e.target;

    const error = validateName(value);

    setName(
      produce(state => {
        state.isTouched = true;
        state.error = error ? error.message : null;
        state.value = value;
      })
    );
  };

  return (
    <div className={styles.form}>
      <Title>Hello, stranger!</Title>
      <Title>How should we call you?</Title>
      <Form.Item
        className={styles.formItem}
        validateStatus={name.isTouched && name.error ? 'error' : 'validating'}
        help={(name.isTouched && name.error) || ''}
      >
        <Input placeholder="Enter your name..." onChange={handleNameChange} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          size="large"
          disabled={!name.isTouched || name.error}
          onClick={() => onSubmit(name.value)}
        >
          That's my name!
        </Button>
      </Form.Item>
    </div>
  );
};

export default Form.create({ name: 'auth' })(AuthForm);
