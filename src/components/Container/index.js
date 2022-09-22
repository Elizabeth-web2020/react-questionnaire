import React, { Component } from 'react';
import Input from '../Input/index';
import Button from '../Button/index';

import './style.css';

class index extends Component {

  state = {
    inputs: [['Имя', 'text', 'input'], ['Фамилия', 'text', 'input'], ['Дата рождения', 'date', 'input'], ['Телефон', 'phone', 'input'], ['Сайт', 'text', 'input'], ['О себе', 'text', 'textarea'], ['Стек технологий', 'text', 'textarea'], ['Описание последнего проекта', 'text', 'textarea']],
    buttons: [['Отмена', 'reset'], ['Сохранить', 'submit']]
  };

  render() {
    return (
      <>
        <form className='container'>
          <h3>Создание анкеты</h3>
          <Input inputs={this.state.inputs} />
          <Button buttons={this.state.buttons} />
        </form>
      </>
    );
  }
}

export default index;