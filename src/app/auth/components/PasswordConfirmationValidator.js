import React from 'react';
import { Form } from 'react-bootstrap';

const errorMessages = {
  confirm: 'Passwords dont match'
}

const PasswordConfirmationValidator = ({
  error,
  passwordRef,
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
      <Form.Label>Password confirmation</Form.Label>
      <Form.Control
        isInvalid={error}
        name='password_confirmation'
        ref={innerRef({
          validate: {
            confirm: value => value === passwordRef
          }
        })}
        type='password'
      />
      {errorText()}
    </Form.Group>
  );
}

export default PasswordConfirmationValidator;