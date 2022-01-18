import React, { useState } from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import './SortAppointments.scss';

const Sort = () => {
  const [sortValue, setSortValue] = useState('');
  const [sortParams, setsortParams] = useState('asc');
  const handleChangeValue = (event) => {
    setSortValue(event.target.value);
  };
  const handleChangeParams = (event) => {
    setsortParams(event.target.value);
  };

  return (
    <div className='sortAppointments_wrapper'>
      <Box className='sortAppointments_mainSelect'>
        <p>Сортировать по:</p>
        <Select
          className='sortAppointments_mainSelect_select'
          value={sortValue}
          onChange={handleChangeValue}
        >
          <MenuItem value={'name'}>Имя</MenuItem>
          <MenuItem value={'doctor'}>Врач</MenuItem>
          <MenuItem value={'date'}>Дата</MenuItem>
          <MenuItem value={'None'}>None</MenuItem>
        </Select>
      </Box>
      {sortValue && <Box className='sortAppointments_secondSelect'>
        <p>Направление:</p>
        <Select
          className='sortAppointments_secondSelect_select'
          value={sortParams}
          onChange={handleChangeParams}
        >
          <MenuItem value={'asc'}>По возрастанию</MenuItem>
          <MenuItem value={'desc'}>По убыванию</MenuItem>
        </Select>
      </Box>}
    </div>

  )
}

export default Sort;