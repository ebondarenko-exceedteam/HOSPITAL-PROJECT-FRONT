import React from 'react';
import Header from '../Header/Header';
import AuthForm from './AuthForm/AuthForm';
import regPageImage from '../../source/images/regPageImage.svg';
import './AuthPage.scss';

const AuthPage = () => {
  return (
    <div className='registration_page'>
      <Header>
        <p>Войти в систему</p>
      </Header>
      <div className='authPage_content'>
        <img
          src={regPageImage}
          alt='regPageImage'
        />
        <AuthForm />
      </div>
    </div>
    
  )
}

export default AuthPage;