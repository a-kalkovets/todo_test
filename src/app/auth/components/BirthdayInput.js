import React from 'react';
import { Form } from 'react-bootstrap';

const BirthdayInput = props => (
  <Form.Control
    name={props.name}
    onChange={props.onChange}
    value={props.value}
    type='date'
  />
);

export default BirthdayInput
