import React from 'react';
import './style.css';

function Button({buttons, resetFn}) {
  return (
    <div className='buttons'>
       {buttons.map((item, i) => (
          <div key={i}>
            {item.buttonType === 'reset'
            ? <button type={item.buttonType} onClick={() => {resetFn()}}>{item.buttonName}</button>
            : <button type={item.buttonType}>{item.buttonName}</button> }
          </div>
        ))}
    </div>
  )
}

export default Button;
