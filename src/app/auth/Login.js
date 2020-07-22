import { useState } from 'react';
import useAuthWrapper from './useAuthWrapper';
import { client } from '../client';

const fields = [
  {
    name: 'login',
    label: 'Login',
  },
  {
    name: 'password',
    label: 'Password',
  }
];

const Login = () => {
  const [state, setState] = useState({
    login: '',
    password: '',
  });


  const onClick = () => {

  };

  const wrappedField = useAuthWrapper({
    fields,
    state,
    setState,
    onClick,
    authType: 'login',
  });

  return (
    wrappedField
  )
};

export default Login;
