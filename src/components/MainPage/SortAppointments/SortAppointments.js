import React, { useState } from 'react';
import { Box, MenuItem, Select, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';
import axios from 'axios';
import open_filter from '../../../source/images/open_filter.svg';
import close_filter from '../../../source/images/close_filter.svg';
import './SortAppointments.scss';

const SortAppointments = ({ allAppointments, setAllAppointments }) => {
  const token = localStorage.getItem('token');
  const [sortParams, setSortParams] = useState({
    value: '',
    param: ''
  });
  const { value, param } = sortParams;
  const [fieldItem, setFieldItem] = useState([
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
  const [directionItem, setDirectoinItem] = useState([
    {
      value: 'asc',
      description: 'По возрастанию'
    },
    {
      value: 'desc',
      description: 'По убыванию'
    }
  ]);
  const [filterFlag, setFilterFlag] = useState(false);
  const [dateValueFrom, setDateValueFrom] = useState();
  const [dateValueTo, setDateValueTo] = useState();

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

  const openFilterBlock = () => {
    setFilterFlag(!filterFlag);
  };

  const filterFunc = () => {
    setAllAppointments(allAppointments.filter(item => item.date >= dateValueFrom && item.date <= dateValueTo));
  };

  const deleteFilter = () => {
    axios.get('http://localhost:8000/getAllAppointments', {
      headers: {
        'Authorization': token
      }
    }).then(res => setAllAppointments(res.data.data))
  }

  return (
    <div className='sortAppointments_wrapper'>
      <div className='sortBlock'>
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
        {value === 'None' || value !== '' && <Box className='sortAppointments_secondSelect'>
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
        <Box className='sortAppointments_filter'>
          <p>Добавить фильтр по дате:</p>
          <img
            onClick={() => openFilterBlock()}
            src={open_filter}
            alt='open_filter'
          />
        </Box>
      </div>
      {filterFlag && <div className='filterBlock'>
        <Box className='filterBlock_datePicker'>
          <p>c:</p>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              className='filterBlock_datePicker_input'
              value={dateValueFrom}
              onChange={(newValue) => setDateValueFrom(moment(newValue).format('YYYY-MM-DD'))}
              renderInput={(params) => (
                <TextField {...params} />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box className='filterBlock_datePicker'>
          <p>по:</p>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              className='filterBlock_datePicker_input'
              value={dateValueTo}
              onChange={(newValue) => setDateValueTo(moment(newValue).format('YYYY-MM-DD'))}
              renderInput={(params) => (
                <TextField {...params} />
              )}
            />
          </LocalizationProvider>
        </Box>
        <button
          onClick={() => filterFunc()}
          className='filterBlock_button'
        >
          Фильтровать
        </button>
        <img
          onClick={() => deleteFilter()}
          src={close_filter}
          alt='close_filter'
        />
      </div>}
    </div>

  )
}

export default SortAppointments;