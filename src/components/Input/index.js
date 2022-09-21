import React, { Component } from 'react';

import './style.css';

export default class index extends Component {
  render(props) {
    return (
      <div className='section'>
        {this.props.inputs.map((item, i) => (
          <div key={i}>
            <label>{item.label}:</label>
            {item.name === 'phone'
            ? <input type={item.type} name={item.name} value={this.props.formValues[item.name]} placeholder={item.label} onChange={this.props.handleChange} />
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
            ? <textarea name={item.name} placeholder={item.label} value={this.props.formValues[item.name]} onChange={this.props.handleChange} rows="7"></textarea> 
            : ''} 
            {this.props.formErrors[item.name] 
            ? <p className='error'>{this.props.formErrors[item.name]}</p>
            : ''}
          </div>
        ))}
      </div>
    );
  }
}
