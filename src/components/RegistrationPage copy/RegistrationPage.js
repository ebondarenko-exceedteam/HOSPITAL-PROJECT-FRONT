import React from 'react';
import Header from '../Header/Header';
import RegForm from '../RegistrationPage/RegForm/RegForm';
import regPageImage from '../../source/images/regPageImage.svg';
import './RegistrationPage.scss';

const RegistrationPage = () => {
  const regHeaderTitle = 'Зарегистрироваться в системе';

  return (
    <div className='registration_page'>
      <Header headerTitle={regHeaderTitle} />
      <div className='registrationPage_content'>
        <img
          src={regPageImage}
          alt='regPageImage'
        />
        <RegForm />
      </div>
    </div>
    
  )
}

export default RegistrationPage;