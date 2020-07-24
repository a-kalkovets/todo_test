import React from 'react';
import { Alert } from 'react-bootstrap';

const EmptyList = ({className}) => (
  <Alert className={className} variant='primary'>Todo list is empty</Alert>
);

export default EmptyList;
