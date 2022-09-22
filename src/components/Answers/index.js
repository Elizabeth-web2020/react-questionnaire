import React, { Component } from 'react';
import './style.css';

class index extends Component {
  render() {
    return (
      <div className='answers'>
        <div className='content'>
          <h3>{this.props.formValues['name']} {this.props.formValues['secondName']}</h3>
          {this.props.inputs.map((item, i) => (
            <div key={i} className='content-item'>
              <div>{item.label}: {this.props.formValues[item.name]}</div>
            </div>
          ))}
          {this.props.textareas.map((item, i) => (
            <div key={i} className='content-item'>
              <div>{item.label}: {this.props.formValues[item.name]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default index;