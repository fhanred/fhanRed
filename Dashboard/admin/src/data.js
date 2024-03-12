import {
    FaUser,
    FaUsers,
    FaServer,
    FaCashRegister,
    FaFileInvoice,
    FaBuilding,
    FaMoneyBillWave,
  } from 'react-icons/fa';
  import { IoStatsChart } from 'react-icons/io5';
  import { RiCake2Fill, RiContactsBookFill, RiCurrencyLine, RiFolder5Fill } from 'react-icons/ri';
  
  export const links = [
    {
      id: 1,
      name: 'Gestión de empleados',
      icon: <FaUser size={24} />,
      path: '/empleados',
    },
    {
      id: 2,
      name: 'Clientes',
      icon: <FaUsers size={24} />,
      path: '/clientes',
    },
    {
      id: 3,
      name: 'Tareas',
      icon: <FaServer size={24} />,
      path: '/tareas',
    },
    {
      id: 4,
      name: 'Caja',
      icon: <FaCashRegister size={24} />,
      path: '/caja',
    },
    {
      id: 5,
      name: 'Comprobantes',
      icon: <FaFileInvoice size={24} />,
      path: '/comprobantes',
    },
 


  ];
  
  export const clientsLinks = [
    {
      id: 1,
      name: "Datos Clientes",
      icon: <RiContactsBookFill size={200}/>,
      path: "/datosClientes",
    },
    {
      id: 2,
      name: "Contratos",
      icon: <RiFolder5Fill size={200} />,
      path: "/clientesContratos",
    },
    {
      id: 3,
      name: "Cartera",
      icon: <RiCurrencyLine size={200}/>,
      path: "/carteraClientes",
    },
    {
      id: 4,
      name: "Cumpleaños",
      icon: <RiCake2Fill size={200}/>,
      path: "/cumpleañosclientes",
    },
  ]