import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Routes from './Routes';

const App = () => (
  <Container className='pt-3'>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </Container>
)

export default App;
