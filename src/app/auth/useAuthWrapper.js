import React from 'react';
import { Col, Button, Form, Row, Card } from 'react-bootstrap';
import CustomInputComponent from './components/CustomInputComponent';
import AuthLinks from './components/AuthLinks';

const authAction = {
  login: 'Login',
  register: 'Register',
}

const useAuthWrapper = ({fields, state, setState, authType, onClick}) => {
  const handleChange = event => {
    state[event.target.name] = event.target.value;
    setState({ ...state });
  };

  const handleClick = () => onClick();

  const authLink = authType === 'login' ? 'register' : 'login';

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={6}>
        <Card>
          <Card.Body>
            {
              fields.map(field =>
                <Form.Group key={field.name}>
                  <Form.Label>{field.label}</Form.Label>
                  {
                    field.hasOwnProperty('component')
                      ? <CustomInputComponent
                        key={field.name}
                        name={field.name}
                        value={state[field.name]}
                        onChange={event => handleChange(event)}
                      >
                        {field.component}
                      </CustomInputComponent>
                      : (
                        <Form.Control
                          name={field.name}
                          value={state[field.name]}
                          onChange={event => handleChange(event)}
                        />
                      )
                  }
                </Form.Group>
              )
            }
            <div className='text-right mb-3'>
              <AuthLinks authType={authType} authLink={authLink}/>
            </div>
            <Form.Group>
              <Button className='w-100' onClick={handleClick} type='button'>{authAction[authType]}</Button>
            </Form.Group>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
};

export default useAuthWrapper;
