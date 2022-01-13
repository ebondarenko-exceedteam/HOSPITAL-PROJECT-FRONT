import React from 'react';
import Header from '../Header/Header';
import Appointment from './Appointment/Appointment';

const MainPage = () => {
  return (
    <div className='mainPage'>
      <Header>
        <p>Приёмы</p>
        <button>Выход</button>
      </Header>
      <Appointment />
    </div>
  )
}

export default MainPage;