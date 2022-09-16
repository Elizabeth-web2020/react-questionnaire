import React, { Component } from 'react';

import './style.css';

export default class index extends Component {
  render(props) {
    return (
      <div className='buttons'>
       {this.props.buttons.map((item) => (
          <input type={item[1]} value={item[0]} />
        ))}
      </div>
    );
  }
}
