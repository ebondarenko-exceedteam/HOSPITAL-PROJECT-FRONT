import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import Header from '../Header/Header';
import NewAppointment from './NewAppointment/NewAppointment';
import AppointmentsList from './AppointmentsList/AppointmentsList';
import EditPopup from './EditPopup/EditPopup';
import DeletePopup from './DeletePopup/DeletePopup';
import SortAppointments from './SortAppointments/SortAppointments';
import open_form from '../../source/images/open_form.svg';
import open_filter from '../../source/images/openFilter.png';
import './MainPage.scss';

const MainPage = () => {
  const [ allAppointments, setAllAppointments ] = useState([]);
  const [ index, setIndex ] = useState('');
  const [ openEdit, setOpenEdit ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ openForm, setOpenForm ] = useState(false);
  const [ openFilter, setOpenFilter ] = useState(false);
  const [ doctors, setDoctors ] = useState([
    'Выберите врача',
    'Иванов Андрей Евгеньевич',
    'Фоменко Наталья Юрьевна',
    'Кузнецова Марина Андреевна',
    'Радищев Сергей Петрович'
  ]);
  const today = moment().format('YYYY-MM-DD');
  const navigate = useNavigate();
  const width = window.innerWidth;

  const closePage = () => {
    localStorage.clear();
    navigate('/authorization');
  }

  return (
    <div className='mainPage'>
      <Header>
        <p>Приёмы</p>
        <button
          onClick={() => closePage()}
        >
          Выход
        </button>
      </Header>
      <div className='toggle_icons'>
        <img
          className='toggle_icons_form'
          onClick={() => setOpenForm(!openForm)}
          src={open_form}
          alt='openForm'
        />
        <img
          className='toggle_icons_filter'
          onClick={() => setOpenFilter(!openFilter)}
          src={open_filter}
          alt='openFilter'
        />
      </div>
      <NewAppointment
        openForm={width < 700 ? openForm : true}
        setAllAppointments={setAllAppointments}
        doctors={doctors}
        today={today}
      />
      <SortAppointments
        openFilter={width < 700 ? openFilter : true}
        allAppointments={allAppointments}
        setAllAppointments={setAllAppointments}
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
        doctors={doctors}
        appointment={allAppointments[index]}
        setAllAppointments={setAllAppointments}
      />}
      {openDelete && <DeletePopup
        open={openDelete}
        setOpen={setOpenDelete}
        today={today}
        doctors={doctors}
        _id={allAppointments[index]._id}
        setAllAppointments={setAllAppointments}
      />}
    </div>
  )
}

export default MainPage;