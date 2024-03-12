import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn/SignIn';
import { userInfo } from './Redux/Actions/actions';
import Navbar from './components/Navbar/Navbar';
import NavbarItems from './components/NavbarItems/NavbarItems'
import Register from './components/Register/Register';
import { links } from './data';
import HomePage from './Pages/HomePage';
import Vouchers from './Pages/Vouchers';
import MovementsCash from './Pages/MovementsCash';
import TaskPage from './Pages/TaskPage';
import Worker from './Pages/Worker';
import Calendary from './components/Calendary/Calendary';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  useEffect(() => {
    localStorage.clear(); // Limpiar el almacenamiento local al cargar la aplicación
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/tareas">
            <TaskPage />
          </Route>
          <Route path="/calendario">
            <Calendary/>

          </Route>
          <Route path="/comprobantes">
            <Vouchers />
            <Route path="/empleados">
            <Worker />
          </Route>
          <Route path="/caja">
            <MovementsCash />
          </Route>
          </Route>
          <Route>
           
              <div style={{ flex: 1, display: 'flex' }}>
                <div>
                  <NavbarItems links={links} />
                </div>
              </div>
              <div style={{ flex: 3 }}>
                <Switch>
                  <Route path="/homePage">
                    <HomePage />
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





