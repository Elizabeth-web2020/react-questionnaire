import React, { Component } from 'react';
import Input from '../Input/index';
import Button from '../Button/index';
import Answers from '../Answers/index';

import './style.css';

class index extends Component {
  constructor() {
    super();

    const initialValue = { name: '', secondName: '', dateOfBirth: '', phone: '', site: '', aboutYourself: '', stack: '', lastProject: ''};

    this.state = {
    inputs: [{label: 'Name', name: 'name', type: 'text', component: 'input'}, 
      {label: 'Second Name', name: 'secondName', type: 'text', component: 'input'},
      {label: 'Date Of Birth', name: 'dateOfBirth', type: 'date', component: 'input'},
      {label: 'Phone Number', name: 'phone', type: 'phone', component: 'input'},
      {label: 'Site Address', name: 'site', type: 'text', component: 'input'}],
    textareas: [{label: 'About Yourself', name: 'aboutYourself', type: 'text', component: 'textarea'},
      {label: 'Technology Stack', name: 'stack', type: 'text', component: 'textarea'},
      {label: 'Description of the latest project', name: 'lastProject', type: 'text', component: 'textarea'}],
    buttons: [{buttonName: 'Cancel', buttonType: 'reset'}, {buttonName: 'Submit', buttonType: 'submit'}],
    formValues: initialValue,
    formErrors: {},
    maxTextareaLength: 600,
    textareaLength: {aboutYourself: 0, stack: 0, lastProject: 0},
    isSubmit: false,
    answersFormVisibility: false
    };

    this.textareaLengthHandler = this.textareaLengthHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateFn = this.validateFn.bind(this);
    this.resetFn = this.resetFn.bind(this);
  }

  textareaLengthHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState(prevState => ({
      textareaLength: {                   
        ...prevState.textareaLength,    
        [name]: value.length     
      }
    }))
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    this.setState(prevState => ({
      formValues: {                   
          ...prevState.formValues,    
          [name]: value.trim()      
      }
    }))
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    let result = this.validateFn(this.state.formValues);

    this.setState({ isSubmit: true});
    this.setState({ formErrors: result}, () => {
      const answersFormVisibilityCondition = Object.keys(this.state.formErrors).length === 0 && this.state.isSubmit && this.state.textareaLength['aboutYourself'] <= this.state.maxTextareaLength && this.state.textareaLength['stack'] <= this.state.maxTextareaLength && this.state.textareaLength['lastProject'] <= this.state.maxTextareaLength;

      if (answersFormVisibilityCondition) {
        this.setState({ answersFormVisibility: true});
      };
    });
  };

  validateFn = (values) => {
    const errors = {};
    const regexName = /^[A-Z]/;
    const regexSite = /^(https:\/\/www\.|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/mg;

    if (!values.name) {errors.name = 'Поле Имя пустое. Заполните пожалуйста!'} else if (!regexName.test(values.name)) {errors.name = 'Это не валидное имя! Первая буква должна быть заглавной.'}
    if (!values.secondName) {errors.secondName = 'Поле Фамилия пустое. Заполните пожалуйста!'} else if (!regexName.test(values.secondName)) {errors.secondName = 'Это не валидное имя! Первая буква должна быть заглавной.'}
    if (!values.dateOfBirth) {errors.dateOfBirth = 'Поле Дата Рождения пустое. Заполните пожалуйста!'}
    if (!values.phone) {errors.phone = 'Поле Телефон пустое. Заполните пожалуйста!'} else if (values.phone < 12) {errors.phone = 'Это не валидный номер! Номер состоит из 12 символов.'}
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
        { !this.state.answersFormVisibility || !this.state.isSubmit
        ? <form className='container' onSubmit={this.handleSubmit}>
            <h3>Create a questionnaire</h3>
            <Input inputs={this.state.inputs} textareas={this.state.textareas} formValues={this.state.formValues} formErrors={this.state.formErrors} textareaLength={this.state.textareaLength} maxTextareaLength={this.state.maxTextareaLength} handleChange={this.handleChange} textareaLengthHandler={this.textareaLengthHandler} />
            <Button buttons={this.state.buttons} resetFn={this.resetFn} />
          </form>
        : <Answers inputs={this.state.inputs} textareas={this.state.textareas} formValues={this.state.formValues} />}
      </div>
    );
  }
}

export default index;