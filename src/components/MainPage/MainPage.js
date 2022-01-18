import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Header from '../Header/Header';
import NewAppointment from './NewAppointment/NewAppointment';
import AppointmentsList from './AppointmentsList/AppointmentsList';
import EditPopup from './EditPopup/EditPopup';
// import DeletePopup from './DeletePopup/DeletePopup';
import './MainPage.scss';

const MainPage = () => {
  const [ allAppointments, setAllAppointments ] = useState([]);
  const [ index, setIndex ] = useState('');
  const [ openEdit, setOpenEdit ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ doctors, setDoctors ] = useState([
    'Выберите врача',
    'Иванов Андрей Евгеньевич',
    'Фоменко Наталья Юрьевна',
    'Кузнецова Марина Андреевна',
    'Радищев Сергей Петрович'
  ]);
  const today = moment().format('YYYY-MM-DD');

  return (
    <div className='mainPage'>
      <Header>
        <p>Приёмы</p>
        <Link to='/authorization' className='button'>Выход</Link>
      </Header>
      <NewAppointment
        setAllAppointments={setAllAppointments}
        doctors={doctors}
        today={today}
      />
      <AppointmentsList
        allAppointments={allAppointments}
        setAllAppointments={setAllAppointments}
        setIndex={setIndex}
        setOpenEdit={setOpenEdit}
        setOpenDelete={setOpenDelete}
      />
      {openEdit && <EditPopup
        open={openEdit}
        setOpen={setOpenEdit}
        today={today}
        doctors={doctors}
        appointment={allAppointments[index]}
        setAllAppointments={setAllAppointments}
      />}
      {/* {openDelete && <DeletePopup
        open={openDelete}
        setOpen={setOpenDelete}
        today={today}
        doctors={doctors}
        _id={allAppointments[index]._id}
        setAllAppointments={setAllAppointments}
      />} */}
    </div>
  )
}

export default MainPage;