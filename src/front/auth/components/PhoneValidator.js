import React from 'react';
import { Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

const errorMessages = {
  required: 'Field is required',
  format: 'Incorrect phone format',
};

const PhoneValidator = ({
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
      <Form.Label>Phone</Form.Label>
      <NumberFormat
        customInput={Form.Control}
        format='###-###-####' mask='_'
        name='phone'
        isInvalid={error}
        getInputRef={innerRef({
          required: true,
          validate: {
            format: value => new RegExp(/^\d{3}-\d{3}-\d{4}$/).test(value),
          }
        })}
      />
      {errorText()}
    </Form.Group>
  );
}

export default PhoneValidator;
