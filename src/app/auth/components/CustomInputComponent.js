import React from 'react';

const CustomInputComponent = (props) => {
  const Component = props.children;
  return (
    <Component
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  )
};

export default CustomInputComponent;
