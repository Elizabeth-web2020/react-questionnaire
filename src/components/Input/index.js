import React from 'react';
import MaskedInput from 'react-text-mask';

import './style.css';

function index({inputs, textareas, formValues, formErrors, textareaLength, maxTextareaLength, handleChange, textareaLengthHandler}) {
  return (
    <div className='section'>
        {inputs.map((item, i) => (
          <div key={i}>
            <label>{item.label}:</label>
            {item.name === 'phone'
            ? <MaskedInput
              mask={[' ', /[1-9]/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
              type={item.type}
              name={item.name}
              placeholder={item.label}
              guide={true}
              onChange={handleChange}
            />
            : <input type={item.type} name={item.name} value={formValues[item.name]} placeholder={item.label} onChange={handleChange} />}
            {formErrors[item.name] 
            ? <p className='error'>{formErrors[item.name]}</p>
            : ''}
          </div>
        ))}

        {textareas.map((item, i) => (
          <div key={i}>
            <label>{item.label}:</label>
            {item.component === 'textarea' 
            ? <textarea name={item.name} placeholder={item.label} value={formValues[item.name]} onChange={(e) => {handleChange(e); textareaLengthHandler(e)}} rows="7"></textarea> 
            : ''} 
            {textareaLength[item.name] <= maxTextareaLength
            ? <p className='warning'>Осталось {maxTextareaLength - textareaLength[item.name]}/{maxTextareaLength}</p>
            : <p className='warning'>Превышен лимит символов в поле</p> }
            {formErrors[item.name] 
            ? <p className='error'>{formErrors[item.name]}</p>
            : ''}
          </div>
        ))}
    </div>
  )
}

export default index;
