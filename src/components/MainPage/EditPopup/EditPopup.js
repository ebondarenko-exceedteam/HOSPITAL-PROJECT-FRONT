import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Box, Modal } from '@mui/material';
import './EditPopup.scss'

const EditPopup = (props) => {
  const { doctors, open, setOpen, today, appointment, setAllAppointments } = props;
  const { _id, date, doctor, name, complaint } = appointment;
  const token = localStorage.getItem('token');
  const handleClose = () => setOpen(false);
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const handlerSubmit = (data) => {
    const {
      editPopupName,
      editPopupDoctor,
      editPopupDate,
      editPopupСomplaint
    } = data;

    axios.patch(
      'http://localhost:8000/changeAppointment',
      {
        _id,
        name: editPopupName,
        doctor: editPopupDoctor,
        date: editPopupDate,
        complaint: editPopupСomplaint
      },
      {
        headers: {
          'Authorization': token
        }
      }
    ).then(res => setAllAppointments(res.data.data));
    setOpen(false);
  }

  return (
    <div className='editPopup_container'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='editPopup_form_wrapper'>
          <div className='editPopup_form_header'>
            <p>Изменить приём</p>
          </div>
          <form className='editPopup_form' onSubmit={handleSubmit(handlerSubmit)}>
            <div className='editPopup_form_item'>
              <label>Имя:</label>
              <input
                {...register('editPopupName', {
                  required: 'Введите ФИО',
                  pattern: {
                    value: /^[a-zA-Zа-яА-Я]+$/,
                    message: 'Только русские или латинские буквы'
                  },
                  value: name,
                })}
              />
              <div className='editPopup_form_item_error'>
                {errors.editPopupName && <p>{errors.editPopupName.message || 'Error!'}</p>}
              </div>
            </div>
            <div className='editPopup_form_item'>
              <label>Врач:</label>
              <select
                {...register('editPopupDoctor', {
                  required: 'Выберите врача',
                  validate: input => input !== 'Выберите врача' || 'Выберите врача',
                  value: doctor
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
              <div className='editPopup_form_item_error'>
                {errors.editPopupDoctor && <p>{errors.editPopupDoctor.message || 'Error!'}</p>}
              </div>
            </div>
            <div className='editPopup_form_item'>
              <label>Дата:</label>
              <input
                type='date'
                min={today}
                {...register('editPopupDate', {
                  required: 'Выберите дату приёма',
                  min: {
                    value: today,
                    message: 'Нельзя выбрать прошедшую дату'
                  },
                  value: date
                })}
              />
              <div className='editPopup_form_item_error'>
                {errors.editPopupDate && <p>{errors.editPopupDate.message || 'Error!'}</p>}
              </div>
            </div>
            <div className='editPopup_form_item'>
              <label>Жалобы:</label>
              <textarea
                {...register('editPopupСomplaint', {
                  required: 'Что Вас беспокоит?',
                  value: complaint
                })}
              />
              <div className='editPopup_form_item_error'>
                {errors.editPopupСomplaint && <p>{errors.editPopupСomplaint.message || 'Error!'}</p>}
              </div>
            </div>
            <div className='editPopup_form_buttonBlock'>
              <div className='editPopup_form_buttonBlock_wrapper'>
                <button
                  className='editPopup_form_buttonBlock_cancel'
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className='editPopup_form_buttonBlock_save'
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default EditPopup;