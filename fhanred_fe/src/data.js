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
    path: '/admin/perfil',
  },
  {
    id: 2,
    name: 'Clientes',
    icon: <FaUsers size={24} />,
    path: '/admin/clientes',
  },
  {
    id: 3,
    name: 'Plataforma Técnica',
    icon: <FaServer size={24} />,
    path: '/admin/plataformaTec',
  },
  {
    id: 4,
    name: 'Caja',
    icon: <FaCashRegister size={24} />,
    path: '/admin/caja',
  },
  {
    id: 5,
    name: 'Facturación',
    icon: <FaFileInvoice size={24} />,
    path: '/admin/facturacion',
  },
  {
    id: 6,
    name: 'Almacenes',
    icon: <FaBuilding size={24} />,
    path: '/admin/almacenes',
  },
  {
    id: 7,
    name: 'Tesorería',
    icon: <FaMoneyBillWave size={24} />,
    path: '/admin/tesoreria',
  },
  {
    id: 8,
    name: 'Informes',
    icon: <IoStatsChart size={24} />,
    path: '/admin/informes',
  },
];

export const clientsLinks = [
  {
    id: 1,
    name: "Datos Clientes",
    icon: <RiContactsBookFill size={200}/>,
    path: "/admin/datosClientes",
  },
  {
    id: 2,
    name: "Contratos",
    icon: <RiFolder5Fill size={200} />,
    path: "/admin/clientesContratos",
  },
  {
    id: 3,
    name: "Cartera",
    icon: <RiCurrencyLine size={200}/>,
    path: "/admin/carteraClientes",
  },
  {
    id: 4,
    name: "Cumpleaños",
    icon: <RiCake2Fill size={200}/>,
    path: "/admin/cumpleañosclientes",
  },
]
