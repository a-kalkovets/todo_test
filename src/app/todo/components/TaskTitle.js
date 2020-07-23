import React, { useState } from 'react';
import { Form, NavLink, InputGroup, Button } from 'react-bootstrap';

const TaskTitle = ({title}) => {
  const [change, setChange] = useState(false);
  const [titleState, setTitleState] = useState(title);

  const handleClick = () => {
    setChange(true);
  };

  const handleChange = event => {
    setTitleState(event.target.value);
  };

  const handleCancelChange = () => {
    setTitleState(title);
    setChange(false);
  };

  const handleSave = () => {
    //save new value
  };

  return (
    change
      ? (
        <InputGroup className='position-absolute'>
          <Form.Control
            autoFocus
            onChange={handleChange}
            value={titleState}
          />
          <InputGroup.Append>
            <Button onClick={handleSave} variant='outline-primary'>Save</Button>
            <Button onClick={handleCancelChange} variant='outline-secondary'>Cancel</Button>
          </InputGroup.Append>
        </InputGroup>
      ) : (
        <NavLink onClick={handleClick} className='w-100 text-truncate pl-0'>{titleState}</NavLink>
      )
  )
};

export default TaskTitle;
