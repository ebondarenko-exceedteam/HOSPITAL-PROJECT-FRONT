import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to='/registration' />} />
        <Route path='/registration' element={<RegistrationPage />} />
      </Routes>
    </div>
  );
}

export default App;
