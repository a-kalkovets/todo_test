import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = ({authLink, authType}) => (
  <Link to={`/${authLink}`}>
    {
      authType === 'login'
        ? 'Does′nt have account?'
        : 'Already have account?'
    }
  </Link>
);

export default AuthLinks;
