import { useState } from 'react';
import PhoneWithMask from './components/PhoneWithMask';
import BirthdayInput from './components/BirthdayInput';
import useAuthWrapper from './useAuthWrapper';
import { client } from '../client';

const fields = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'address',
    label: 'Address',
  },
  {
    name: 'birthday',
    label: 'Birthday',
    component: BirthdayInput,
  },
  {
    name: 'phone',
    label: 'Phone number',
    component: PhoneWithMask,
  },
  {
    name: 'login',
    label: 'Username',
  },
  {
    name: 'password',
    label: 'Password',
  },
  {
    name: 'password_confirmation',
    label: 'Password confirmation',
  }
];

const Registration = () => {
  const [state, setState] = useState({
    name: '',
    address: '',
    birthday: '',
    phone: '',
    login: '',
    password: '',
    password_confirmation: '',
  });

  const onClick = () => {
    client.post('/auth/register', state).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };

  const wrappedField = useAuthWrapper({
    fields,
    state,
    setState,
    onClick,
    authType: 'register'
  });

  return (
    wrappedField
  )
};

export default Registration;
