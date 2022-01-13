import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Appointment.scss';

const Appointment = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = (`${yyyy}-${mm}-${dd}`);

  // const [ date, setDate ] = useState(today);

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

  const hendlerSubmit = (data) => {
    console.log(data);
    reset();
  }

  return (
    <div className='appointments'>
      <form className='appointments_form' onSubmit={handleSubmit(hendlerSubmit)}>
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
              <option value='Выберите врача'>Выберите врача</option>
              <option value='Иванов Андрей Евгеньевич'>Иванов Андрей Евгеньевич</option>
              <option value='Фоменко Наталья Юрьевна'>Фоменко Наталья Юрьевна</option>
              <option value='Кузнецова Марина Андреевна'>Кузнецова Марина Андреевна</option>
              <option value='Радищев Сергей Петрович'>Радищев Сергей Петрович</option>
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

export default Appointment;