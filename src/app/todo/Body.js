import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TaskStatus from './components/TaskStatus';
import TaskTitle from './components/TaskTitle';

const tasks = [
  {
    title: 'agergcae4t',
    status: '1',
  },
  {
    title: 'ct43v3y34',
    status: '0',
  },
  {
    title: 'ct43v3y34',
    status: '0',
  }
];

const Body = () => {
  return (
    <Row>
      <Col xs={12}>
        <ul className='p-0 m-0 list-unstyled'>
          {tasks.map((task, index) => (
            <li key={index}>
              <div
                className='d-flex align-items-center text-nowrap position-relative'
                style={{
                  justifyContent: task.titleSelected ? 'space-between' : 'normal'
                }}
              >
                <TaskTitle title={task.title} />
                <TaskStatus status={task.status} />
              </div>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  )
};

export default Body;
