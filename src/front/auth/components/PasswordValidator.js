import React from 'react';
import { Form } from 'react-bootstrap';
import PasswordStrange from 'password-validator';
import config from '../../../config';

const errorMessages = {
  strength: 'Password must contain uppercase, lowercase and digit chars',
  minLength: `Min length ${config.validation.user.password.min} chars`,
  maxLength: `Max length ${config.validation.user.password.max} chars`,
}

const schema = new PasswordStrange()
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()
  .has().not().symbols();

const PasswordValidator = ({
  error,
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
      <Form.Label>Password</Form.Label>
      <Form.Control
        isInvalid={error}
        name='password'
        ref={innerRef({
          minLength: config.validation.user.password.min,
          maxLength: config.validation.user.password.max,
          validate: {
            strength: value => schema.validate(value)
          }
        })}
        type='password'
      />
      {errorText()}
    </Form.Group>
  );
}

export default PasswordValidator;