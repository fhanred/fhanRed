import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Views/Admin/SignIn/SignIn';
import Home from './Views/Admin/Home/Home';
import Navbar from './components/Navbar/Navbar';
import NavbarItems from './components/NavbarItems/NavbarItems';
import { useSelector } from 'react-redux';
import Customers from './Views/Admin/Customers/Customers';
import CustomersData from './components/CustomersData/CustomersData';
import Invoice from './components/Invoice/Invoice';


function App() {
  const userInfo = useSelector((state) => state.userInfo);
  const isAuthenticated = Boolean(userInfo && userInfo.name && userInfo.rol);
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        {/* {isAuthenticated && <NavbarItems />} */}
        <Switch>
          <Route exact path="/" ><SignIn /></Route>
          <Route path="/admin/home" ><Home /><NavbarItems /></Route>
          <Route path="/admin/clientes"><Customers/><NavbarItems /></Route>
          <Route path="/admin/datosClientes"><CustomersData/><NavbarItems /></Route>
          <Route path="/admin/clientesContratos"><Invoice/><NavbarItems /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

