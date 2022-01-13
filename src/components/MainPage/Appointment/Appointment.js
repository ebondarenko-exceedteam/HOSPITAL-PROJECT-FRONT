import React from 'react';
import { useForm } from 'react-hook-form';
import './Appointment.scss';

const Appointment = () => {
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

  return (
    <div className='appointments'>
      <form className='appointments_form'>
        <div className='appointments_form_item'>
          <label>Имя</label>
            <input
              {...register('appointmentName', {
                required: 'Поле обязательно к заполнению',
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
      </form>
    </div>
  )
}

export default Appointment;