import React from 'react';
import { Col, Button, Form, Row, Card, Alert } from 'react-bootstrap';
import AuthLinks from './components/AuthLinks';

const authAction = {
  login: 'Login',
  register: 'Register',
}

const AuthWrapper = ({children, authType, onSubmit, apiError}) => {
  const handleClick = (props) => onSubmit(props);

  const authLink = authType === 'login' ? 'register' : 'login';

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={6}>
        { apiError && <Alert variant='danger'>{apiError}</Alert> }
        <Card>
          <form onSubmit={handleClick}>
            <Card.Body>
                { children }
              <div className='text-right mb-3'>
                <AuthLinks authType={authType} authLink={authLink}/>
              </div>
              <Form.Group>
                <Button className='w-100' type='submit'>{authAction[authType]}</Button>
              </Form.Group>
            </Card.Body>
          </form>
        </Card>
      </Col>
    </Row>
  )
};

export default AuthWrapper;
