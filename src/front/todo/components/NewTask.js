import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { client } from '../../client';

const NewTask = ({fetchTodoList}) => {
  const [newTask, setNewTask] = useState('');

  const handleChange = event => {
    setNewTask(event.target.value);
  };

  const handleAdd = () => {
    if (newTask.length > 0) {
      client.post('/todo', {title: newTask})
        .then(() => {
          fetchTodoList();
        }).catch(error => {
        console.log(error.response);
      });
    }
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
      <Button onClick={handleAdd} className='ml-2'>Add</Button>
    </div>
  )
};

export default NewTask;
