import React from 'react'
import { Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

const PhoneWithMask = props => (
  <NumberFormat
    customInput={Form.Control}
    format='###-###-####' mask='_'
    name={props.name}
    value={props.value}
    onValueChange={value => props.onChange({
      target: {
        name: props.name,
        value: value.value,
      }
    })}
  />
);

export default PhoneWithMask;
