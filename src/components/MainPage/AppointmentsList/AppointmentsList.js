import React, { useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
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

  const editAppointment = () => {

  }

  return (
    <TableContainer className='appointment_container'>
      <Table className='appointment_table'>
        <TableHead className='appointment_table_head'>
          <TableRow className='appointment_table_head_row'>
            <TableCell className='appointment_table_head_row_cell'>Имя</TableCell>
            <TableCell className='appointment_table_head_row_cell'>Врач</TableCell>
            <TableCell className='appointment_table_head_row_cell'>Дата</TableCell>
            <TableCell className='appointment_table_head_row_cell'>Жалобы</TableCell>
            <TableCell className='appointment_table_head_row_cell'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='appointment_table_body'>
          {
            allAppointments.map((item, index) => (
              <TableRow
              className='appointment_table_body_row'
                key={`appointment_${index}`}
              >
                <TableCell className='appointment_table_body_row_cell'>{item.name}</TableCell>
                <TableCell className='appointment_table_body_row_cell'>{item.doctor}</TableCell>
                <TableCell className='appointment_table_body_row_cell'>{item.date}</TableCell>
                <TableCell className='appointment_table_body_row_cell'>{item.complaint}</TableCell>
                <TableCell className='appointment_table_body_row_cell'>
                  <img
                    src={deleteLogo}
                    alt='deleteLogo'
                  />
                  <img
                    onClick={editAppointment}
                    src={editLogo}
                    alt='editLogo'
                  />
                </TableCell>
              </TableRow>
            ))
          }
          <TableRow>

          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AppointmentsList;