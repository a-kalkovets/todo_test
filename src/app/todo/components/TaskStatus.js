import React, {useState} from 'react';
import { Form, NavLink, Button } from 'react-bootstrap';

const statuses = [
  'created',
  'in progress',
  'completed',
];

const TaskStatus = ({status}) => {
  const [change, setChange] = useState(false);
  const [statusState, setStatusState] = useState(status);

  const handleClick = () => {
    setChange(true);
  };

  const handlePick = event => {
    //change status
    setStatusState(event.target.value);
    console.log(event.target.value);
  };

  const cancelChange = () => {
    setChange(false);
  };

  const deleteTask = () => {
    //delete task
  };

  return (
    change
      ? (
        <Form.Group className='position-absolute w-100 d-flex m-0 bg-white'>
          <div className='w-100'>
            <Form.Control
              as="select"
              value={statusState}
              onChange={handlePick}
            >
              {statuses.map((status, index) => (
                <option key={index} value={index}>{status}</option>
              ))}
            </Form.Control>
          </div>
          <Button className='ml-1 mr-1' onClick={cancelChange}>Cancel</Button>
          <Button onClick={deleteTask}>✕</Button>
        </Form.Group>
      ) : (
        <NavLink onClick={handleClick} className='pl-0 pr-0'>{statuses[statusState]}</NavLink>
      )
  );
}

export default TaskStatus;
