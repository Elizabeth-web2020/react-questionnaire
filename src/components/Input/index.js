import React, { Component } from 'react';

import './style.css';

export default class index extends Component {
  render(props) {
    return (
      <div className='section'>
        {this.props.inputs.map((item, i) => (
          <div key={i}>
            <label>{item[0]}:</label>
            {item[2] === 'input' ? <input type={item[1]} placeholder={item[0]} /> : <textarea placeholder={item[0]} rows="7"></textarea>} 
          </div>
        ))}
      </div>
    );
  }
}
