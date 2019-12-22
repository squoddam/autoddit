import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';

import styles from './AuthPage.module.css';
import Title from 'antd/lib/typography/Title';

const AuthForm = ({
  form: { getFieldDecorator, isFieldsTouched, getFieldsError, getFieldsValue },
  onSubmit
}) => {
  const isTouched = isFieldsTouched();
  const errors = getFieldsError();

  const isDisabled = !isTouched || Object.values(errors).some(Boolean);

  const handleSubmit = useCallback(() => onSubmit(getFieldsValue()), [
    getFieldsValue,
    onSubmit
  ]);

  return (
    <div className={styles.form}>
      <Title>Hello, stranger!</Title>
      <Title>How should we call you?</Title>
      <Form.Item className={styles.formItem}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please, enter your name!' }]
        })(<Input placeholder="Enter your name..." />)}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          size="large"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          That's my name!
        </Button>
      </Form.Item>
    </div>
  );
};

export default Form.create({ name: 'auth' })(AuthForm);
