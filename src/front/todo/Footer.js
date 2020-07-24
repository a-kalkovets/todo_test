import React from 'react';

const Footer = ({taskCount}) => (
  <footer>
    <hr/>
    <div>
      {taskCount} items
    </div>
  </footer>
)

export default Footer;
