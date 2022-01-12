import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Snackbars from '../../Snackbars/Snackbars';
import './AuthForm.scss'

const AuthForm = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const handleClick = () => {
    setOpen(true);
  };

  const hendlerSubmit = ({authFormLogin, authFormPassword}) => {
    axios.post('http://localhost:8000/authorizationUser', {
      login: authFormLogin,
      password: authFormPassword
    }).then(res => {
      const { token, login } = res.data;
      const result = { token, login };
      localStorage.setItem('user', JSON.stringify(result));
    }).catch(err => {
      switch (err.response.status) {
        case 404:
          setMessage('Такой пользователь не зарегистрирован');
          handleClick();
          break;
        case 412:
          setMessage('Неправильный пароль');
          handleClick();
          break;
        case 400:
          setMessage('Ошибка авторизации');
          handleClick();
          break;
      };
    });
  }

  return (
    <div className='authForm'>
      <Snackbars
        message={message}
        open={open}
        setOpen={setOpen}
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