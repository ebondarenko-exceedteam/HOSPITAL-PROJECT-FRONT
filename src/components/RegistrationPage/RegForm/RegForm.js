import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Snackbars from '../../Snackbars/Snackbars';
import './RegForm.scss'

const RegForm = () => {
  const [password, setPassword] = useState();
  const [ messages, setMessages ] = useState({
    open: false,
    message: ''
  })
  
  const {
    register,
    formState: {
      errors,
    },
    reset,
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const hendlerSubmit = ({regFormLogin, regFormPassword}) => {
    axios.post('http://localhost:8000/createNewUser', {
      login: regFormLogin,
      password: regFormPassword
    }).then(res => {
      const { token, login } = res.data;
      const result = { token, login };
      localStorage.setItem('user', JSON.stringify(result));
    }).catch(err => {
      switch (err.response.status) {
        case 400:
          setMessages({
            open: true,
            message: 'Ошибка регистрации'
          });
          break;
        case 401:
          setMessages({
            open: true,
            message: 'Пользователь с таким логином уже существует'
          });
          break;
      };
    });

    reset();
  }

  return (
    <div className='regForm'>
      <Snackbars
        messages={messages}
        setMessages={setMessages}
      />
      <p className='regForm_title'>Регистрация</p>
      <form onSubmit={handleSubmit(hendlerSubmit)}>
        <label>Login:</label>
        <input
          id='regFormLogin'
          placeholder='Login'
          {...register('regFormLogin', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 6,
              message: 'Минимум 6 символов'
            },
            pattern: {
              value: /^\S+$/gm,
              message: 'Не используйте пробелы'
            }
          })}
        />
        <div className='regForm_error'>
          {errors.regFormLogin && <p>{errors.regFormLogin.message || 'Error!'}</p>}
        </div>
        <label>Password:</label>
        <input
          type='password'
          id='regFormPassword'
          placeholder='Password'
          {...register('regFormPassword', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 6,
              message: 'Минимум 6 символов'
            },
            pattern: {
              value: /^(?=.*\d)[a-zA-Z\d]{6,25}$/,
              message: 'Только латинские буквы и минимум 1 цифра'
            },
            onBlur: e => setPassword(e.target.value)
          })}
        />
        <div className='regForm_error'>
          {errors.regFormPassword && <p>{errors.regFormPassword.message || 'Error!'}</p>}
        </div>
        <label>Repeat password:</label>
        <input
          type='password'
          id='regFormRepeatPassword'
          placeholder='Password'
          {...register('regFormRepeatPassword', {
            required: 'Поле обязательно к заполнению',
            validate: (input) => input === password,
          })}
        />
        <div className='regForm_error'>
          {errors.regFormRepeatPassword && <p>{'Пароль не совпадает'}</p>}
        </div>
        <button>Зарегистрироваться</button>
        <Link to='/authorization' className='regForm_link'>Авторизоваться</Link>
      </form>
    </div>
  )
}

export default RegForm;