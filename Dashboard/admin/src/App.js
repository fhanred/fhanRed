import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import { userInfo } from './Redux/Actions/actions';
import Navbar from './components/Navbar/Navbar';
import { links } from './data';
import HomePage from './Pages/HomePage';
import Vouchers from './Pages/Vouchers/Vouchers';
import MovementsCash from './Pages/MovementsCash';
import TaskPage from './Pages/TaskPage';
import Worker from './Pages/Worker.js';
import Calendary from './components/Calendary/Calendary';
import FormCreateWorker from './components/FormsWorkers/FormCreateWorker.js';
import FormUpdateUser from './components/FormsWorkers/FormUpdateUser.js';
import '../src/global.css'
import ClientDetail from './components/ClientDetail/ClientDetail.js';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <SignIn />
            
          </Route>

          <Route path="/tareas">
            <TaskPage />
          </Route>
          <Route path="/calendario">
            <Calendary />
          </Route>
          <Route path="/comprobantes">
            <Vouchers />

            <Route path="/caja">
              <MovementsCash />
            </Route>
          </Route>
          <Route>
           
            <div style={{ flex: 3 }}>
              <Switch>
                <Route path="/homePage">
                  <HomePage />
                </Route>
                <Route path="/empleados">
                  <Worker />
                </Route>
                <Route path='/clientes'>
                  <ClientDetail/>
                </Route>
                <Route path="/altaEmpleado">
                  <FormCreateWorker />
                </Route>
                <Route path="/modificarEmpleado">
                  <FormUpdateUser />
                </Route>
              </Switch>
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
