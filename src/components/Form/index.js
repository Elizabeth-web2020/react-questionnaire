import React, {useState} from "react";
import Input from '../Input/index';
import Button from '../Button/index';
import Answers from '../Answers/index';

import './style.css';

function Form() {

  const initialValue = { name: '', secondName: '', dateOfBirth: '', phone: '', site: '', aboutYourself: '', stack: '', lastProject: ''};
  const inputsMassive = [{label: 'Name', name: 'name', type: 'text', component: 'input'}, 
    {label: 'Second Name', name: 'secondName', type: 'text', component: 'input'},
    {label: 'Date Of Birth', name: 'dateOfBirth', type: 'date', component: 'input'},
    {label: 'Phone Number', name: 'phone', type: 'phone', component: 'input'},
    {label: 'Site Address', name: 'site', type: 'text', component: 'input'}];
  const textareasMassive = [{label: 'About Yourself', name: 'aboutYourself', type: 'text', component: 'textarea'},
    {label: 'Technology Stack', name: 'stack', type: 'text', component: 'textarea'},
    {label: 'Description of the latest project', name: 'lastProject', type: 'text', component: 'textarea'}];
  const buttonsMassive = [{buttonName: 'Cancel', buttonType: 'reset'}, {buttonName: 'Submit', buttonType: 'submit'}];
    
  const [inputs, setInputs] = useState(inputsMassive)
  const [textareas, setTextareas] = useState(textareasMassive)
  const [buttons, setButtons] = useState(buttonsMassive)
  const [formValues, setFormValues] = useState(initialValue)
  const [formErrors, setFormErrors] = useState({})
  const [maxTextareaLength, setMaxTextareaLength] = useState(600)
  const [textareaLength, setTextareaLength] = useState({aboutYourself: 0, stack: 0, lastProject: 0})
  const [isSubmit, setIsSubmit] = useState(false)
  const [answersFormVisibility, setAnswersFormVisibility] = useState(false)

  const textareaLengthHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setTextareaLength({...textareaLength, [name]: value.length})
  }

  const handleChange = (e) => {
    let { name, value } = e.target;

    setFormValues({...formValues, [name]: value.trim()})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const answersFormVisibilityCondition = Object.keys(formErrors).length === 0 && isSubmit && textareaLength['aboutYourself'] <= maxTextareaLength && textareaLength['stack'] <= maxTextareaLength && textareaLength['lastProject'] <= maxTextareaLength;
    let result = validateFn(formValues);

    setIsSubmit(true)
    setFormErrors(result)

    if (answersFormVisibilityCondition) {
      setAnswersFormVisibility(true);
    };
  }

  const validateFn = (values) => {
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
  }

  const resetFn = () => {
    setFormValues({ name: '', secondName: '', dateOfBirth: '', phone: '', site: '', aboutYourself: '', stack: '', lastProject: ''})
    setFormErrors({})
    setIsSubmit(false)
  }

  return (
    <div className='main'>
        { !answersFormVisibility || !isSubmit
        ? <form className='container' onSubmit={handleSubmit}>
            <h3>Create a questionnaire</h3>
            <Input inputs={inputs} textareas={textareas} formValues={formValues} formErrors={formErrors} textareaLength={textareaLength} maxTextareaLength={maxTextareaLength} handleChange={handleChange} textareaLengthHandler={textareaLengthHandler} />
            <Button buttons={buttons} resetFn={resetFn} />
          </form>
        : <Answers inputs={inputs} textareas={textareas} formValues={formValues} />}
    </div>
  )
}

export default Form;

  

      
