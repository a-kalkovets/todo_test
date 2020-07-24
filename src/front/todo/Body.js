import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import TaskStatus from './components/TaskStatus';
import TaskTitle from './components/TaskTitle';
import EmptyList from './components/EmptyList';

const circle = {
  width: 8,
  height: 8,
  border: '1px solid',
  borderRadius: '50%',
  position: 'absolute',
  left: -13,
  top: 0,
  bottom: 0,
  margin: 'auto',
}

const Body = ({request, taskList, fetchTodoList, changeColor}) => (
  <Row className='mt-3'>
    <Col xs={12} className={request ? 'd-flex justify-content-center p-3' : ''}>
      {request
        ? (
          <Spinner animation="grow" />
        ) : (
          <ul className='p-0 m-0 list-unstyled'>
            {taskList.length > 0
              ? (
                taskList.map((task, index) => (
                  <li className='task-list position-relative' key={index}>
                    <div className='d-flex align-items-center text-nowrap position-relative'>
                      <TaskTitle
                        id={index}
                        title={task.title}
                        fetchTodoList={fetchTodoList}
                      />
                      <TaskStatus
                        id={index}
                        status={task.status}
                        fetchTodoList={fetchTodoList}
                      />
                    </div>
                    <span style={{
                      ...circle,
                      borderColor: task.color,
                      backgroundColor: task.color,
                    }} role='button' onClick={event => changeColor(event, index)} />
                  </li>
                ))
              ) : (
                <EmptyList className='mt-3'/>
              )}
          </ul>
        )}
    </Col>
  </Row>
);

export default Body;
