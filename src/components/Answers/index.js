import React from 'react';
import './style.css';

function Answers({inputs, textareas, formValues}) {
  return (
    <div className='answers'>
        <div className='content'>
          <h3>{formValues['name']} {formValues['secondName']}</h3>
          {inputs.map((item, i) => (
            <div key={i} className='content-item'>
              <div>{item.label}: {formValues[item.name]}</div>
            </div>
          ))}
          {textareas.map((item, i) => (
            <div key={i} className='content-item'>
              <div>{item.label}: {formValues[item.name]}</div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Answers;

