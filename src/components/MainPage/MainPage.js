import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import NewAppointment from './NewAppointment/NewAppointment';
import AppointmentsList from './AppointmentsList/AppointmentsList';
// import EditPage from './EditPage/EditPage';
import './MainPage.scss';

const MainPage = () => {
  const [ allAppointments, setAllAppointments ] = useState([]);

  return (
    <div className='mainPage'>
      <Header>
        <p>Приёмы</p>
        <Link to='/authorization' className='button'>Выход</Link>
      </Header>
      <NewAppointment
        setAllAppointments={setAllAppointments}
      />
      <AppointmentsList
        allAppointments={allAppointments}
        setAllAppointments={setAllAppointments}
      />
      {/* <EditPage /> */}
    </div>
  )
}

export default MainPage;