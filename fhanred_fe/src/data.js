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
      name: 'Perfil',
      icon: <FaUser size={24} />,
      path: '/perfil',
    },
    {
      id: 2,
      name: 'Clientes',
      icon: <FaUsers size={24} />,
      path: '/clientes',
    },
    {
      id: 3,
      name: 'Plataforma Técnica',
      icon: <FaServer size={24} />,
      path: '/plataformaTec',
    },
    {
      id: 4,
      name: 'Caja',
      icon: <FaCashRegister size={24} />,
      path: '/caja',
    },
    {
      id: 5,
      name: 'Facturación',
      icon: <FaFileInvoice size={24} />,
      path: '/facturacion',
    },
    {
      id: 6,
      name: 'Almacenes',
      icon: <FaBuilding size={24} />,
      path: '/almacenes',
    },
    {
      id: 7,
      name: 'Tesorería',
      icon: <FaMoneyBillWave size={24} />,
      path: '/tesoreria',
    },
    {
      id: 8,
      name: 'Informes',
      icon: <IoStatsChart size={24} />,
      path: '/informes',
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