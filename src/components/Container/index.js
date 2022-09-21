import React, { Component } from 'react';
import Input from '../Input/index';
import Button from '../Button/index';

import './style.css';

class index extends Component {
  constructor() {
    super();

    const initialValue = { name: '', secondName: '', dateOfBirth: '', phone: '', site: '', aboutYourself: '', stack: '', lastProject: ''};

    this.state = {
    inputs: [{label: 'Имя', name: 'name', type: 'text', component: 'input'}, 
      {label: 'Фамилия', name: 'secondName', type: 'text', component: 'input'},
      {label: 'Дата рождения', name: 'dateOfBirth', type: 'date', component: 'input'},
      {label: 'Телефон', name: 'phone', type: 'phone', component: 'input'},
      {label: 'Сайт', name: 'site', type: 'text', component: 'input'}],
    textareas: [{label: 'О себе', name: 'aboutYourself', type: 'text', component: 'textarea'},
      {label: 'Стек технологий', name: 'stack', type: 'text', component: 'textarea'},
      {label: 'Описание последнего проекта', name: 'lastProject', type: 'text', component: 'textarea'}],
    buttons: [{buttonName: 'Отмена', buttonType: 'reset'}, {buttonName: 'Сохранить', buttonType: 'submit'}],
    formValues: initialValue,
    formErrors: {},
    isSubmit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateFn = this.validateFn.bind(this);
    this.resetFn = this.resetFn.bind(this);
  }

  componentDidUpdate() {
    if (Object.keys(this.state.formErrors).length === 0 && this.state.isSubmit) {
      console.log('formValues', this.state.formValues)
    }
  }

  handleChange = (e) => {
    // console.log(e.target);
    let { name, value } = e.target;

    // this.setState({ formValues: { [name]: value}})

    this.setState(prevState => ({
      formValues: {                   
          ...prevState.formValues,    
          [name]: value.trim()      
      }
  }))

    // this.setState((state, props) => ({
    //   formValues: { [name]: value }
    // }));
    console.log(this.state.formValues)
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let result = this.validateFn(this.state.formValues);

    console.log(result);
    this.setState({ formErrors: result});
    this.setState({ isSubmit: true});
  };

  validateFn = (values) => {
    const errors = {};
    const regexName = /^[A-Z]/;
    const regexSite = /^(https:\/\/www\.|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/mg;

    if (!values.name) {errors.name = 'Поле Имя пустое. Заполните пожалуйста!'} else if (!regexName.test(values.name)) {errors.name = 'Это не валидное имя! Первая буква должна быть заглавной.'}
    if (!values.secondName) {errors.secondName = 'Поле Фамилия пустое. Заполните пожалуйста!'} else if (!regexName.test(values.secondName)) {errors.secondName = 'Это не валидное имя! Первая буква должна быть заглавной.'}
    if (!values.dateOfBirth) {errors.dateOfBirth = 'Поле Дата Рождения пустое. Заполните пожалуйста!'}
    if (!values.phone) {errors.phone = 'Поле Телефон пустое. Заполните пожалуйста!'}
    if (!values.site) {errors.site = 'Поле Сайт пустое. Заполните пожалуйста!'} else if (!regexSite.test(values.site)) {errors.site = 'Это не валидное адресс! Адрес должен начинаться с https:// .'}
    if (!values.aboutYourself) {errors.aboutYourself = 'Поле О Себе пустое. Заполните пожалуйста!'}
    if (!values.stack) {errors.stack = 'Поле Стек Технологий пустое. Заполните пожалуйста!'}
    if (!values.lastProject) {errors.lastProject = 'Поле Описание последнего проекта пустое. Заполните пожалуйста!'}

    return errors;
  };

  resetFn = () => {
    this.setState({ formValues: { name: '', secondName: '', dateOfBirth: '', phone: '', site: '', aboutYourself: '', stack: '', lastProject: ''}});
    this.setState({ formErrors: {}});
    this.setState({ isSubmit: false});
  };


  render() {
    return (
      <div className='main'>
        <pre>{JSON.stringify(this.state.formValues, undefined, 2)}</pre>
        <div className='divider'></div>
        <form className='container' onSubmit={this.handleSubmit}>
          <h3>Создание анкеты</h3>
          <Input inputs={this.state.inputs} textareas={this.state.textareas} formValues={this.state.formValues} formErrors={this.state.formErrors} handleChange={this.handleChange} />
          <Button buttons={this.state.buttons} resetFn={this.resetFn} />
        </form>
      </div>
    );
  }
}

export default index;