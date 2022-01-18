import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Snackbars from '../../Snackbars/Snackbars';
import './AuthForm.scss'

const AuthForm = () => {
  const [ localToken, setlocalToken ] = useState(false);
  const [ messages, setMessages ] = useState({
    open: false,
    message: ''
  });
  
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const hendlerSubmit = ({authFormLogin, authFormPassword}) => {
    axios.post('http://localhost:8000/authorizationUser', {
      login: authFormLogin,
      password: authFormPassword
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      setlocalToken(localStorage.getItem('token'));
    }).catch(err => {
      switch (err.response.status) {
        case 404:
          setMessages({
            open: true,
            message: 'Такой пользователь не зарегистрирован'
          });
          break;
        case 412:
          setMessages({
            open: true,
            message: 'Неправильный пароль'
          });
          break;
        case 400:
          setMessages({
            open: true,
            message: 'Ошибка авторизации'
          });
          break;
      };
    });
  }

  if (localToken) {
    return <Navigate to='/main' />
  }

  return (
    <div className='authForm'>
      <Snackbars
        messages={messages}
        setMessages={setMessages}
      />
      <p className='authForm_title'>Войти в систему</p>
      <form onSubmit={handleSubmit(hendlerSubmit)}>
        <label>Login:</label>
        <input
          id='authFormLogin'
          placeholder='Login'
          {...register('authFormLogin', {
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
        <div className='authForm_error'>
          {errors.authFormLogin && <p>{errors.authFormLogin.message || 'Error!'}</p>}
        </div>
        <label>Password:</label>
        <input
          type='password'
          id='authFormPassword'
          placeholder='Password'
          {...register('authFormPassword', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 6,
              message: 'Минимум 6 символов'
            },
            pattern: {
              value: /^(?=.*\d)[a-zA-Z\d]{6,25}$/,
              message: 'Только латинские буквы и минимум 1 цифра'
            }
          })}
        />
        <div className='authForm_error'>
          {errors.authFormPassword && <p>{errors.authFormPassword.message || 'Error!'}</p>}
        </div>
        <button>Войти</button>
        <Link to='/registration' className='authForm_link'>Зарегистрироваться</Link>
      </form>
    </div>
  )
}

export default AuthForm;