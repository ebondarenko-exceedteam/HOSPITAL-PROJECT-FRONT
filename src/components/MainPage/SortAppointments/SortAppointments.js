import React, { useState } from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import './SortAppointments.scss';

const SortAppointments = () => {
  const [sortParams, setSortParams] = useState({
    value: '',
    param: ''
  });

  const handleChangeValue = (event) => {
    setSortParams({
      value: event.target.value,
      param: 'asc'
    });
  };

  const handleChangeParams = (event) => {
    setSortParams({
      ...sortParams,
      param: event.target.value
    });
  };

  return (
    <div className='sortAppointments_wrapper'>
      <Box className='sortAppointments_mainSelect'>
        <p>Сортировать по:</p>
        <Select
          className='sortAppointments_mainSelect_select'
          value={sortParams.value}
          onChange={handleChangeValue}
        >
          <MenuItem value={'name'}>Имя</MenuItem>
          <MenuItem value={'doctor'}>Врач</MenuItem>
          <MenuItem value={'date'}>Дата</MenuItem>
          <MenuItem value={'None'}>None</MenuItem>
        </Select>
      </Box>
      {sortParams.param && <Box className='sortAppointments_secondSelect'>
        <p>Направление:</p>
        <Select
          className='sortAppointments_secondSelect_select'
          value={sortParams.param}
          onChange={handleChangeParams}
        >
          <MenuItem value={'asc'}>По возрастанию</MenuItem>
          <MenuItem value={'desc'}>По убыванию</MenuItem>
        </Select>
      </Box>}
    </div>

  )
}

export default SortAppointments;