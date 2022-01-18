import React from 'react';
import axios from 'axios';
import { Box, Modal } from '@mui/material';
import './DeletePopup.scss'

const deletePopup = (props) => {
  const { setAllAppointments, open, setOpen, _id } = props;
  const token = localStorage.getItem('token');
  const handleClose = () => setOpen(false);

  const deleteAppointment = () => {
    axios.delete(
      'http://localhost:8000/deleteAppointment', {
      data: {
        _id
      },
      headers: {
        'Authorization': token
      }
    }
    ).then(res => setAllAppointments(res.data.data));
    setOpen(false);
  }

  return (
    <div className='deletePopup_container'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='deletePopup_wrapper'>
          <div className='deletePopup_header'>
            <p>Удалить приём</p>
          </div>
          <p className='deletePopup_descritpion'>
            Вы действительно хотите удалить приём?
          </p>
          <div className='deletePopup_buttonBlock'>
            <div className='deletePopup_buttonBlock_wrapper'>
              <button
                className='deletePopup_buttonBlock_cancel'
                onClick={() => handleClose}
              >
                Cancel
              </button>
              <button
                className='deletePopup_buttonBlock_save'
                onClick={() => deleteAppointment}
              >
                Delete
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default deletePopup;