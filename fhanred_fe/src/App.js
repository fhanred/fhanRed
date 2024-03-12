
import { useEffect } from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../src/Redux/Actions/actions'
import SignIn from './Views/Admin/SignIn/SignIn';
import Home from './Views/Admin/Home/Home';
import Navbar from './components/Navbar/Navbar';
import NavbarItems from './components/NavbarItems/NavbarItems';
import Customers from './Views/Admin/Customers/Customers';
import CustomersData from './components/CustomersData/CustomersData';
import Invoice from './components/Invoice/Invoice';
import ForgotPassword from './components/Forgot/ForgotPassword';
import Register from './components/Register/Register';
import Treasury from './Views/Admin/Treasury/Treasury';
import Billing from './Views/Admin/Billing/Billing';
import Perfil from './Views/Admin/Perfil/Perfil';
import Encashment from './Views/Admin/Encashment/Encashment';
import { links } from './data';
import ChangePassword from './Views/Admin/ChangePassword/ChangePassword';
import Contract from './components/Contract/Contract';
import ReceiptNumberForm from './Views/Admin/Encashment/ReceiptNumberForm';
import Summary from "./Views/Admin/Summary/Summary"
import MovementsDetail  from './Views/Admin/MovementsDetails/MovementsDetail';


function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  useEffect(() => {
    localStorage.clear(); 
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="">
            <div style={{ flex: 1, display: 'flex' }}>
              <div>
                <NavbarItems links={links} />
              </div>
            </div>
            <div style={{ flex: 3 }}>
              <Switch>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/perfil">
                  <Perfil />
                </Route>
                <Route path="/clientes">
                  <Customers />
                </Route>
                <Route path="/tesoreria">
                  <Treasury />
                </Route>
                <Route path="/datosClientes">
                  <CustomersData />
                </Route>
                <Route path="/clientesContratos">
                  <Invoice />
                </Route>
                <Route path="/facturacion">
                  <Billing />
                </Route>
                <Route path="/changePassword">
                  <ChangePassword />
                </Route>
                <Route path="/caja">
                  <Encashment/>
                  </Route>
                  <Route path="/movements">
                  <MovementsDetail/>
                  </Route>
                <Route path="/resumen">
                  <Summary />
                </Route>
                <Route path="/nrecibo">
                  <ReceiptNumberForm />
                </Route>
                <Route path="/contracts">
                    <Contract/>
                </Route>
          
              </Switch>
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
