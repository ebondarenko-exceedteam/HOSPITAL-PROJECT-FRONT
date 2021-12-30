import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/registration'>
          <RegistrationPage />
        </Route>
        <Redirect from='/' to='/registration' />
      </Switch>
    </div>
  );
}

export default App;
