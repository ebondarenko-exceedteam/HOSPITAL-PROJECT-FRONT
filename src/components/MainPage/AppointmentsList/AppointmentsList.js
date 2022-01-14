import React, { useEffect, useState } from 'react';
import axios from 'axios';
import deleteLogo from '../../../source/images/delete.svg';
import editLogo from '../../../source/images/edit.svg';
import './AppointmentsList.scss';

const AppointmentsList = ({ allAppointments, setAllAppointments }) => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('http://localhost:8000/getAllAppointments', {
      headers: {
        'Authorization': token
      }
    }).then(res => setAllAppointments(res.data.data))
  }, [])

  return (
    <div className='appointments_content'>
      <div className='appointments_header'>
        <p className='appointments_header_name'>Имя</p>
        <p className='appointments_header_doctor'>Врач</p>
        <p className='appointments_header_date'>Дата</p>
        <p className='appointments_header_appointment'>Жалобы</p>
        <div className='appointments_header_empty'></div>
      </div>
      <div className='appointments_list'>
        {allAppointments.map((item, index) => <div key={`appointment_${index}`} className='appointment_block'>
              <p className='appointments_block_name'>{item.name}</p>
              <p className='appointments_block_doctor'>{item.doctor}</p>
              <p className='appointments_block_date'>{item.date}</p>
              <p className='appointments_block_appointment'>{item.complaint}</p>
              <div className='appointment_block_buttons'>
                <img
                  src={deleteLogo}
                  alt='deleteLogo'
                />
                <img
                  src={editLogo}
                  alt='editLogo'
                />
              </div>
            </div>
          )
        }
      </div>
    </div>
    
  )
}

export default AppointmentsList;