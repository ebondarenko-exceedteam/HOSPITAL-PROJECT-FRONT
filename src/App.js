import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import './App.css';

const App = () => {
  const regTitle = 'Зарегистрироваться в системе';
  return (
    <div className="App">
      <Switch>
        <Route path='/registration'>
          <RegistrationPage headerTitle={regTitle} />
        </Route>
        <Redirect from='/' to='/registration' />
      </Switch>
    </div>
  );
}

export default App;
