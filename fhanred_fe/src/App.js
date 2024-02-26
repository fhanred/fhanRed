import { useLocation, BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../src/Redux/Actions/actions'
import axios from 'axios';
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
import IncomeList from './Views/Admin/Encashment/incomeList';
import { links } from './data';
import ChangePassword from './Views/Admin/ChangePassword/ChangePassword';
import Contract from './components/Contract/Contract';
import ReceiptNumberForm from './Views/Admin/Encashment/ReceiptNumberForm';
import Summary from "./Views/Admin/Summary/Summary"



function App() {

  const dispatch = useDispatch();
  const creditials = useSelector((state) => state.userInfo);

  const handleLogin = async (userData) => {
    const { email, password } = userData;
    try {
      const emailCapital = email.toUpperCase()
      const infoUser = { email: emailCapital, password }
      // const response = await axios.post('http://localhost:3001/auth/login', infoUser);
      dispatch(userInfo(infoUser));
      const data = creditials.data;
      if(!data){
        console.log(creditials)
      }
      if(data){
        console.log('data: ', data)
        return data;
      }
    } catch (error) {
      console.error('se produjo un error: ', error)
    }
  }

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
                <Route path="/admin/perfil">
                  <Perfil />
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
                <Route path="/admin/changePassword">
                  <ChangePassword />
                </Route>
                <Route path="/admin/caja">
                  <Encashment />
                </Route>
                <Route path="/admin/resumen">
                  <Summary />
                </Route>
                <Route path="/admin/income">
                  <IncomeList />
                </Route>
                <Route path="/admin/nrecibo">
                  <ReceiptNumberForm />
                </Route>
                <Route path="/admin/contracts">
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
