import React from 'react'

const Button = (props) => {
    const { onClick, children, className = '' } = props;
    return (
      <button onClick={onClick} className={className} type="button">
         
        {children} 
      </button>
    );
  }


export default Button;
