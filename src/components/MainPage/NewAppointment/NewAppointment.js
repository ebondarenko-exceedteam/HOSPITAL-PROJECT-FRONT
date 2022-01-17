import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import axios from 'axios';
import './NewAppointment.scss';

const NewAppointment = ({ setAllAppointments }) => {
  const [doctors, setDoctors] = useState([
    'Выберите врача',
    'Иванов Андрей Евгеньевич',
    'Фоменко Наталья Юрьевна',
    'Кузнецова Марина Андреевна',
    'Радищев Сергей Петрович'
  ])
  const today = moment().format('YYYY-MM-DD');
  const { token, _id } = JSON.parse(localStorage.getItem('user'));
  const {
    register,
    formState: {
      errors,
    },
    reset,
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const handlerSubmit = (data) => {
    const {
      appointmentName,
      appointmentDoctor,
      appointmentDate,
      appointmentСomplaint
    } = data;

    axios.post(
      'http://localhost:8000/createNewAppointment',
      {
        userId: _id,
        name: appointmentName,
        doctor: appointmentDoctor,
        date: appointmentDate,
        complaint: appointmentСomplaint
      },
      {
        headers: {
          'Authorization': token
        }
      }
    ).then(res => setAllAppointments(res.data.data));
    reset();
  }

  return (
    <div className='newAppointment'>
      <form className='appointments_form' onSubmit={handleSubmit(handlerSubmit)}>
        <div className='appointments_form_item'>
          <label>Имя:</label>
          <input
            {...register('appointmentName', {
              required: 'Введите ФИО',
              pattern: {
                value: /^[a-zA-Zа-яА-Я]+$/,
                message: 'Только русские или латинские буквы'
              }
            })}
          />
          <div className='appointmentForm_error'>
            {errors.appointmentName && <p>{errors.appointmentName.message || 'Error!'}</p>}
          </div>
        </div>
        <div className='appointments_form_item'>
          <label>Врач:</label>
          <select
            {...register('appointmentDoctor', {
              required: 'Выберите врача',
              validate: input => input !== 'Выберите врача' || 'Выберите врача'
            })}
          >
            {
              doctors.map((item, index) => (
                <option
                  key={`doctor${index}`}
                  value={item}
                >
                  {item}
                </option>
              ))
            }
          </select>
          <div className='appointmentForm_error'>
            {errors.appointmentDoctor && <p>{errors.appointmentDoctor.message || 'Error!'}</p>}
          </div>
        </div>
        <div className='appointments_form_item'>
          <label>Дата:</label>
          <input
            type='date'
            min={today}
            {...register('appointmentDate', {
              required: 'Выберите дату приёма',
              min: {
                value: today,
                message: 'Нельзя выбрать прошедшую дату'
              },
            })}
          />
          <div className='appointmentForm_error'>
            {errors.appointmentDate && <p>{errors.appointmentDate.message || 'Error!'}</p>}
          </div>
        </div>
        <div className='appointments_form_item'>
          <label>Жалобы:</label>
          <textarea
            {...register('appointmentСomplaint', {
              required: 'Что Вас беспокоит?'
            })}
          />
          <div className='appointmentForm_error'>
            {errors.appointmentСomplaint && <p>{errors.appointmentСomplaint.message || 'Error!'}</p>}
          </div>
        </div>
        <button>Добавить</button>
      </form>
    </div>
  )
}

export default NewAppointment;