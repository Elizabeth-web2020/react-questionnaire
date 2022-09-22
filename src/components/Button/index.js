import React, { Component } from 'react';
import './style.css';

export default class index extends Component {
  render(props) {
    return (
      <div className='buttons'>
       {this.props.buttons.map((item, i) => (
          <div key={i}>
            {item.buttonType === 'reset'
            ? <button type={item.buttonType} onClick={() => {this.props.resetFn()}}>{item.buttonName}</button>
            : <button type={item.buttonType}>{item.buttonName}</button> }
          </div>
        ))}
      </div>
    );
  }
}
