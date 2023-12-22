import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Views/Admin/SignIn/SignIn';
import Home from './Views/Admin/Home/Home';
import Navbar from './components/Navbar/Navbar';
import NavbarItems from './components/NavbarItems/NavbarItems';
import { useSelector } from 'react-redux';
import Customers from './Views/Admin/Customers/Customers';
import CustomersData from './components/CustomersData/CustomersData';
import Invoice from './components/Invoice/Invoice';
import ForgotPassword from './components/Forgot/ForgotPassword';
import Register from './components/Register/Register';
import Treasury from './Views/Admin/Treasury/Treasury';
import Billing from './Views/Admin/Billing/Billing';
import { links } from './data';

function App() {
  const userInfo = useSelector((state) => state.userInfo);
  const isAuthenticated = Boolean(userInfo && userInfo.name && userInfo.rol);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        {/* {isAuthenticated && <NavbarItems links={links} />} */}
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
          <Route path="/admin">
            <div style={{ flex: 1, display: 'flex' }}>
              <div>
                <NavbarItems links={links} />
              </div>
            </div>
            <div style={{ flex: 3 }}>
              <Switch>
                <Route path="/admin/home">
                  <Home />
                </Route>
                <Route path="/admin/clientes">
                  <Customers />
                </Route>
                <Route path="/admin/tesoreria">
                  <Treasury />
                </Route>
                <Route path="/admin/datosClientes">
                  <CustomersData />
                </Route>
                <Route path="/admin/clientesContratos">
                  <Invoice />
                </Route>
                <Route path="/admin/facturacion">
                  <Billing />
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
