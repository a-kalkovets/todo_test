import React, {useEffect, useRef, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import TextValidator from './components/TextValidator';
import PasswordValidator from './components/PasswordValidator';
import PasswordConfirmationValidator from './components/PasswordConfirmationValidator';
import PhoneValidator from './components/PhoneValidator';
import { client } from '../client';
import config from '../../config';
import { isTokenValid } from '../helper';

const Registration = () => {
  const [uniqueUsername, setUniqueUsername] = useState(true);
  const [apiError, setApiError] = useState(false);
  const {register, handleSubmit, errors, watch, trigger} = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const history = useHistory();

  useEffect(() => {
    if (isTokenValid()) {
      history.push('/');
    }
  }, [history]);

  const onSubmit = (data) => {
    const phone = data.phone.replaceAll('-', '');
    client.post('/auth/register', {
      ...data,
      phone,
    }).then(response => {
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch(error => {
      const response = error.response;
      if (response.status === 422) {
        const username = response.data.errors.find(error => error.param === 'username');
        if (username) {
          setUniqueUsername(false);
          trigger('username');
        }
      } else {
        setApiError(response.data.errors.message);
      }
    });
  };

  return (
    <AuthWrapper onSubmit={handleSubmit(onSubmit)} authType='register' apiError={apiError}>
      <TextValidator
        label='Name'
        name='name'
        innerRef={register({
          required: true,
          minLength: config.validation.name.min,
          axLength: config.validation.name.max
        })}
        error={errors.name}
        errorMessages={{
          required: 'Field is required',
          minLength: `Min length: ${config.validation.name.min} chars`,
          maxLength: `Max length: ${config.validation.name.min} chars`,
        }}
      />
      <TextValidator
        label='Address'
        name='address'
        innerRef={register({
          required: true,
          minLength: config.validation.address.min,
          maxLength: config.validation.address.max
        })}
        error={errors.address}
        errorMessages={{
          required: 'Field is required',
          minLength: `Min length: ${config.validation.address.min} chars`,
          maxLength: `Max length: ${config.validation.address.min} chars`,
        }}
      />
      <TextValidator
        label='Birthday'
        name='birthday'
        type='date'
        innerRef={register({
          required: true,
          pattern: config.validation.birthday.regex
        })}
        error={errors.birthday}
        errorMessages={{
          required: 'Field is required',
          pattern: `Invalid date format`,
        }}
      />

      <PhoneValidator
        error={errors.phone}
        innerRef={register}
      />

      <TextValidator
        label='Username'
        name='username'
        innerRef={register({
          required: true,
          minLength: config.validation.username.min,
          maxLength: config.validation.username.max,
          validate: {
            notUnique: () => uniqueUsername
          },
        })}
        error={errors.username}
        errorMessages={{
          required: 'Field is required',
          minLength: `Min length: ${config.validation.username.min} chars`,
          maxLength: `Max length: ${config.validation.username.min} chars`,
          notUnique: 'Username already in use',
        }}
      />
      <PasswordValidator
        error={errors.password}
        innerRef={register}
      />
      <PasswordConfirmationValidator
        error={errors.password_confirmation}
        innerRef={register}
        passwordRef={password.current}
      />

    </AuthWrapper>
  )
};

export default Registration;
