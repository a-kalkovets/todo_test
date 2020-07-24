import React from 'react';
import NewTask from './components/NewTask';

const Header = ({fetchTodoList}) => (
  <header>
    <h2 align='center' className='text-uppercase text-secondary'>Things to do</h2>
    <NewTask fetchTodoList={fetchTodoList} />
  </header>
);

export default Header;
