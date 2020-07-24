import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import AuthWrapper from './AuthWrapper';
import { client } from '../client';
import { isTokenValid } from '../helper';

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [authError, setAuthError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isTokenValid()) {
      history.push('/');
    }
  }, [history]);

  const handleChange = event => {
    state[event.target.name] = event.target.value;
    setState({ ...state });
  };

  const onClick = (event) => {
    event.preventDefault();
    client.post('/auth/login', state).then(response => {
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch(error => {
      setAuthError(error.response.data.errors.message);
    });
  };

  return (
    <AuthWrapper onSubmit={onClick} authType='login' apiError={authError}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          name='username'
          onChange={handleChange}
          value={state.username}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name='password'
          type='password'
          onChange={handleChange}
          value={state.password}
        />
      </Form.Group>
    </AuthWrapper>
  )
};

export default Login;
