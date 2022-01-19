import React, { useState } from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import './SortAppointments.scss';

const SortAppointments = ({ allAppointments, setAllAppointments }) => {
  const [sortParams, setSortParams] = useState({
    value: '',
    param: ''
  });
  const { value, param } = sortParams;
  const [ fieldItem, setFieldItem ] = useState([
    {
      value: 'name',
      description: 'Имя'
    },
    {
      value: 'doctor',
      description: 'Врач'
    },
    {
      value: 'date',
      description: 'Дата'
    },
    {
      value: 'None',
      description: 'None'
    }
  ]);
  const [ directionItem, setDirectoinItem ] = useState([
    {
      value: 'asc',
      description: 'По возрастанию'
    },
    {
      value: 'desc',
      description: 'По убыванию'
    }
  ]);

  const sortFunc = (field, direction) => {
    if (field === 'None') field = '_id';
    allAppointments.sort((a, b) => b[field] > a[field] ? -1 : b[field] < a[field] ? 1 : 0);
    if (direction === 'desc') allAppointments.reverse();
    setAllAppointments([...allAppointments]);
  };

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
          {
            fieldItem.map(({ value, description }, index) => (
            <MenuItem
              key={`field_${index}`}
              value={value}>
                {description}
            </MenuItem>
            ))
          }
        </Select>
      </Box>
      {value !== 'None' && <Box className='sortAppointments_secondSelect'>
        <p>Направление:</p>
        <Select
          className='sortAppointments_secondSelect_select'
          value={param}
          onChange={(e) => handleChangeParams(e)}
        >
          {
            directionItem.map(({ value, description }, index) => (
            <MenuItem
              key={`field_${index}`}
              value={value}>
                {description}
            </MenuItem>
            ))
          }
        </Select>
      </Box>}
    </div>

  )
}

export default SortAppointments;