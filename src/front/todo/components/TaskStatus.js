import React, { useState, useEffect } from 'react';
import { Form, NavLink, Button, ButtonGroup, DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import { client } from '../../client';

const statuses = [
  'created',
  'in progress',
  'completed',
];

const TaskStatus = ({status, id, fetchTodoList}) => {
  const [request, setRequest] = useState(false);
  const [change, setChange] = useState(false);
  const [statusState, setStatusState] = useState(status);

  const cancelChange = () => {
    setChange(false);
  };

  const deleteTask = () => {
    setRequest(true);
    client.delete('/todo', {
      params: {id}
    }).then(() => {
      fetchTodoList();
      cancelChange();
      setRequest(false);
    }).catch(error => {
      console.log(error.response);
    });
  };

  const handleClick = () => {
    setChange(true);
  };

  useEffect(() => {
    setStatusState(status);
  }, [status]);

  const handlePick = (event, status) => {
    setRequest(true);
    client.patch('/todo', {
      id,
      status,
    }).then(() => {
      fetchTodoList();
      cancelChange();
      setRequest(false);
    }).catch(error => {
      console.log(error.response);
    });
  };

  return (
    request
      ? (
        <Spinner animation="grow" />
      ) : (
        change
          ? (
            <ButtonGroup className='d-flex m-0 bg-white'>
              <DropdownButton as={ButtonGroup} title={statuses[statusState]}>
                {statuses.map((status, index) => (
                  <Dropdown.Item onClick={event => handlePick(event, index)} key={index}>{status}</Dropdown.Item>
                ))}
              </DropdownButton>
              <Button onClick={cancelChange}>Cancel</Button>
              <Button onClick={deleteTask}>✕</Button>
            </ButtonGroup>
          ) : (
            <NavLink onClick={handleClick} className='pl-0 pr-0'>{statuses[statusState]}</NavLink>
          )
      )
  );
}

export default TaskStatus;
