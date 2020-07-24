import React, { useEffect, useState } from 'react';
import { Form, NavLink, InputGroup, Button, Spinner } from 'react-bootstrap';
import { client } from '../../client';

const TaskTitle = ({title, fetchTodoList, id}) => {
  const [request, setRequest] = useState(false);
  const [change, setChange] = useState(false);
  const [titleState, setTitleState] = useState(title);

  const handleClick = () => {
    setChange(true);
  };

  const handleChange = event => {
    setTitleState(event.target.value);
  };

  const handleCancelUpdate = () => {
    setTitleState(title);
    setChange(false);
  };

  const handleCloseUpdate = () => {
    setChange(false);
  };

  useEffect(() => {
    setTitleState(title);
  }, [title]);

  const handleUpdate = () => {
    if (titleState.length > 0) {
      setRequest(true);
      client.patch('/todo', {
        id,
        title: titleState,
      })
        .then(() => {
          fetchTodoList();
          handleCloseUpdate();
          setRequest(false);
        }).catch(error => {
          console.log(error.response);
        });
    }
  };

  return (
    change
      ? (
        <InputGroup className='position-absolute bg-white'>
          {
            request
              ? (
                <Spinner animation="grow" />
              ) : (
                <React.Fragment>
                  <Form.Control
                    autoFocus
                    onChange={handleChange}
                    value={titleState}
                  />
                  <InputGroup.Append>
                    <Button onClick={handleUpdate} variant='primary'>Save</Button>
                    <Button onClick={handleCancelUpdate} variant='outline-secondary'>Cancel</Button>
                  </InputGroup.Append>
                </React.Fragment>
              )
          }
        </InputGroup>
      ) : (
        <NavLink onClick={handleClick} className='w-100 text-truncate pl-0'>{titleState}</NavLink>
      )
  )
};

export default TaskTitle;
