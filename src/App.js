import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import AuthPage from './components/AuthPage/AuthPage';
import MainPage from './components/MainPage/MainPage';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/authorization' element={<AuthPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/' element={<Navigate to='/authorization' />} />
      </Routes>
    </div>
  );
}

export default App;
