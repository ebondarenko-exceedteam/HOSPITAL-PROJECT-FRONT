import React from 'react';
import { useForm } from 'react-hook-form';
import './RegForm.scss'

const RegForm = () => {
  const {
    register,
    formState: {
      errors
    },
    reset,
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const hendlerSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  }

  return (
    <div className='regForm'>
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
            }
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
        <div className='regForm_error'>
          {errors.regFormRepeatPassword && <p>{errors.regFormRepeatPassword.message || 'Error!'}</p>}
        </div>
        <button>Зарегистрироваться</button>
        <p className='regForm_link'>Авторизоваться</p>
      </form>
    </div>
  )
}

export default RegForm;