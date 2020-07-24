import React, {useEffect, useState} from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import ChangeColor from './components/ChangeColor';
import { client } from '../client';

const TodoList = () => {
  const [request, setRequest] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [todoId, setTodoId] = useState(false);

  useEffect(() => {
    fetchTodoList();
  }, []);

  const handleChangeColor = (event, index) => {
    setTodoId(index);
  };

  const cancelChangeColor = () => {
    setTodoId(false);
  }

  const fetchTodoList = () => {
    client.get('/todo')
      .then(response => {
        setTaskList([ ...response.data.tasks ]);
        setRequest(false);
      }).catch(error => {
      console.log(error.response);
    });
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={12} lg={9} className='mb-3'>
        <Card>
          <Card.Body>
            <Header fetchTodoList={fetchTodoList} />
            <Body
              fetchTodoList={fetchTodoList}
              request={request}
              taskList={taskList}
              changeColor={handleChangeColor}
            />
            <Footer taskCount={taskList.length} />
          </Card.Body>
        </Card>
      </Col>
      {todoId !== false
      && (
        <Col xs={12} md={12} lg={9}>
          <Card>
            <Card.Header className='text-right'>
              <span role='button' onClick={cancelChangeColor}>✕</span>
            </Card.Header>
            <Card.Body className='d-flex justify-content-center'>
              <ChangeColor fetchTodoList={fetchTodoList} todoId={todoId} setTodoId={setTodoId} />
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
}

export default TodoList;
