import React from 'react';
import { Form } from 'react-bootstrap';

const TextValidator = ({
  label,
  name,
  error,
  errorMessages,
  type,
  onFocus,
  innerRef,
}) => {
  const errorText = () => {
    if (!error) {
      return null;
    }

    return (
      <Form.Control.Feedback type='invalid'>
        {errorMessages[error.type]}
      </Form.Control.Feedback>
    );
  }

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        isInvalid={error}
        name={name}
        onFocus={onFocus || null}
        ref={innerRef}
        type={type || 'text'}
      />
      {errorText()}
    </Form.Group>
  );
}

export default TextValidator;