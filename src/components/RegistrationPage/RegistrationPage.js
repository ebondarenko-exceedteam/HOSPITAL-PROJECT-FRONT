import React from 'react';
import Header from '../Header/Header';
import RegForm from './RegForm/RegForm';
import regPageImage from '../../source/images/regPageImage.svg';
import './RegistrationPage.scss';

const RegistrationPage = () => {
  return (
    <div className='registration_page'>
      <Header>
        <p>Зарегистрироваться в системе</p>
      </Header>
      <div className='registrationPage_content'>
        <img
          src={regPageImage}
          alt='regPageImage'
        />
        <RegForm />
      </div>
    </div>
  );
}

export default RegistrationPage;