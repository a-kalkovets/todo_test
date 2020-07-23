import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';

const TodoList = () => {
  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={12} lg={9}>
        <Card>
          <Card.Body>
            <Header/>
            <Body/>
            <Footer/>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
};

export default TodoList;
