import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
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

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const userRole = useSelector((state) => state.authentication.user?.id_role);

  
  if (!isAuthenticated || userRole !== 4) {
    return <Redirect to="/" />;
  }

 
  return <Route {...rest}>{children}</Route>;
};


const App = () => {
  

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

          <PrivateRoute path="/tareas">
            <TaskPage />
          </PrivateRoute>
          <PrivateRoute path="/calendario">
            <Calendary />
          </PrivateRoute>
          <PrivateRoute path="/comprobantes">
            <Vouchers />

            <PrivateRoute path="/caja">
              <MovementsCash />

            </PrivateRoute>
          </PrivateRoute>
          <PrivateRoute>

            <div style={{ flex: 3 }}>
              <Switch>
                <PrivateRoute path="/homePage">
                  <HomePage />
                </PrivateRoute>
                <PrivateRoute path="/empleados">
                  <Worker />
                </PrivateRoute>
                <PrivateRoute path='/clientes'>
                  <ClientDetail/>
                </PrivateRoute>
                <PrivateRoute path="/altaEmpleado">
                  <FormCreateWorker />
                </PrivateRoute>
                <PrivateRoute path="/modificarEmpleado">
                  <FormUpdateUser />
                </PrivateRoute>
              </Switch>
            </div>
          </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
