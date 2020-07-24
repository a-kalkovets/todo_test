import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import { Spinner } from 'react-bootstrap';
import { client } from '../../client';

const ChangeColor = ({setTodoId, todoId, fetchTodoList}) => {
  const [request, setRequest] = useState(false);

  const handleChangeColor = color => {
    setRequest(true);
    client.patch('/todo', {
      id: todoId,
      color: color.hex,
    }).then(() => {
      fetchTodoList();
      setTodoId(false);
    }).catch(error => {
      console.log(error.response);
    });
  };

  return (
    request
      ? (
        <Spinner animation="grow" />
      ) : (
        <CirclePicker onChange={handleChangeColor} />
      )
  )
};

export default ChangeColor;
