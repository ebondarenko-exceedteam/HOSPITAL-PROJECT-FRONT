import React from 'react';
import './RegForm.scss'

const RegForm = () => {
  const handleSubmit = () => {}

  return (
    <div className='regForm'>
      <p className='regForm_title'>Регистрация</p>
      <form onSubmit={handleSubmit}>
        <label>Login:</label>
        <input type='text' id='regFormLogin' name='regFormLogin' placeholder='Login' />
        <label>Password:</label>
        <input type='password' id='regFormPassword' name='regFormPassword' placeholder='Password' />
        <label>Repeat password:</label>
        <input type='password' id='regFormRepeatPassword' name='regFormRepeatPassword' placeholder='Password' />
        <button>Зарегистрироваться</button>
        <p className='regForm_link'>Авторизоваться</p>
      </form>
    </div>
  )
}

export default RegForm;