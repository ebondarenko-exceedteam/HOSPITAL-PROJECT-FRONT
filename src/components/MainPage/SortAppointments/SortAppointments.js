import React, { useState } from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import './SortAppointments.scss';

const SortAppointments = ({ allAppointments, setAllAppointments }) => {
  const [ sortParams, setSortParams ] = useState({
    value: '',
    param: ''
  });
  const { value, param } = sortParams;

  const sortFunc = (field, direction) => {
    allAppointments.sort((a, b) => b[field] > a[field] ? -1 : b[field] < a[field] ? 1 : 0);
    if (direction === 'desc') allAppointments.reverse();
    setAllAppointments([...allAppointments]);
  }

  const handleChangeValue = (event) => {
    const value = event.target.value;
    const param = 'asc';
    setSortParams({
      value,
      param
    });
    sortFunc(value, param);
  };

  const handleChangeParams = (event) => {
    const param = event.target.value;
    setSortParams(prev => {
      return {
        ...prev,
        param
      }
    });
    sortFunc(value, param);
  };

  return (
    <div className='sortAppointments_wrapper'>
      <Box className='sortAppointments_mainSelect'>
        <p>Сортировать по:</p>
        <Select
          className='sortAppointments_mainSelect_select'
          value={value}
          onChange={(e) => handleChangeValue(e)}
        >
          <MenuItem value={'name'}>Имя</MenuItem>
          <MenuItem value={'doctor'}>Врач</MenuItem>
          <MenuItem value={'date'}>Дата</MenuItem>
          <MenuItem value={'None'}>None</MenuItem>
        </Select>
      </Box>
      {param && <Box className='sortAppointments_secondSelect'>
        <p>Направление:</p>
        <Select
          className='sortAppointments_secondSelect_select'
          value={param}
          onChange={(e) => handleChangeParams(e)}
        >
          <MenuItem value={'asc'}>По возрастанию</MenuItem>
          <MenuItem value={'desc'}>По убыванию</MenuItem>
        </Select>
      </Box>}
    </div>

  )
}

export default SortAppointments;