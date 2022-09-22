import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';

import './style.css';

export default class index extends Component {
  render(props) {
    return (
      <div className='section'>
        {this.props.inputs.map((item, i) => (
          <div key={i}>
            <label>{item.label}:</label>
            {item.name === 'phone'
            ? <MaskedInput
              mask={[' ', /[1-9]/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
              type={item.type}
              name={item.name}
              placeholder={item.label}
              guide={true}
              onChange={this.props.handleChange}
            />
            : <input type={item.type} name={item.name} value={this.props.formValues[item.name]} placeholder={item.label} onChange={this.props.handleChange} />}
            {this.props.formErrors[item.name] 
            ? <p className='error'>{this.props.formErrors[item.name]}</p>
            : ''}
          </div>
        ))}

        {this.props.textareas.map((item, i) => (
          <div key={i}>
            <label>{item.label}:</label>
            {item.component === 'textarea' 
            ? <textarea name={item.name} placeholder={item.label} value={this.props.formValues[item.name]} onChange={(e) => {this.props.handleChange(e); this.props.textareaLengthHandler(e)}} rows="7"></textarea> 
            : ''} 
            {this.props.textareaLength[item.name] <= this.props.maxTextareaLength
            ? <p className='warning'>Осталось {this.props.maxTextareaLength - this.props.textareaLength[item.name]}/{this.props.maxTextareaLength}</p>
            : <p className='warning'>Превышен лимит символов в поле</p> }
            {this.props.formErrors[item.name] 
            ? <p className='error'>{this.props.formErrors[item.name]}</p>
            : ''}
          </div>
        ))}
      </div>
    );
  }
}
