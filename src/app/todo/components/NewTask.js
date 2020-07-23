import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const NewTask = () => {
  const [newTask, setNewTask] = useState();

  const handleChange = event => {
    setNewTask(event.target.value);
  };

  return (
    <div className='d-flex'>
      <div className='w-100'>
        <Form.Control
          name='new-task'
          value={newTask}
          onChange={handleChange}
        />
      </div>
      <Button className='ml-2'>Add</Button>
    </div>
  )
};

export default NewTask;
