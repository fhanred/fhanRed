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
import {
  RiCake2Fill,
  RiContactsBookFill,
  RiCurrencyLine,
  RiFolder5Fill,
} from 'react-icons/ri';

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
    name: 'Datos Clientes',
    icon: <RiContactsBookFill  />,
    path: '/admin/datosClientes',
  },
  {
    id: 2,
    name: 'Contratos',
    icon: <RiFolder5Fill  />,
    path: '/admin/clientesContratos',
  },

  {
    id: 3,
    name: 'Cumpleaños',
    icon: <RiCake2Fill />,
    path: '/admin/cumpleañosclientes',
  },
];

export const tesoreriaLinks = [
  {
    id: 1,
    name: 'Cartera',
    icon: <RiCurrencyLine />,
    path: '/admin/carteraClientes',
  },
];

export const options = [
  { value: 'none', label: 'Selecciona una opción' },
  { value: '10', label: 'Efectivo' },
  { value: '48', label: 'Tarjeta Crédito' },
  { value: '49', label: 'Tarjeta Débito' },
  { value: '47', label: 'Transferencia Débito Bancaria' },
  { value: '42', label: 'Consignación bancaria' },
  { value: '44', label: 'Nota cambiaria' },
  { value: '3', label: 'Débito ACH' },
  { value: '20', label: 'Cheque' },
  { value: '25', label: 'Cheque certificado' },
  { value: '23', label: 'Cheque bancario de gerencia' },
  { value: '26', label: 'Cheque Local' },
  { value: '71', label: 'Bonos' },
  { value: '24', label: 'Nota cambiaria esperando aceptación ' },
  { value: '72', label: 'Vales ' },
  { value: '64', label: 'Nota promisoria firmada por el banco ' },
  { value: '61', label: 'Nota promisoria firmada por el acreedor ' },
  { value: '65', label: 'Nota promisoria firmada por un banco avalada por otro banco ' },
  { value: '62', label: 'Nota promisoria firmada por el acreedor, avalada por el banco ' },
  { value: '66', label: 'Nota promisoria firmada  ' },
  { value: '63', label: 'Nota promisoria firmada por el acreedor, avalada por un tercero ' },
  { value: '67', label: 'Nota promisoria firmada por un tercero avalada por un banco ' },
  { value: '60', label: 'Nota promisoria ' },
  { value: '2', label: 'Crédito ACH ' },
  { value: '96', label: 'Método de pago solicitado no usado ' },
  { value: 'ZZZ', label: 'Otro* ' },
  { value: '91', label: 'Nota bancaria transferible ' },
  { value: '95', label: 'Giro formato abierto ' },
  { value: '92', label: 'Cheque local transferible ' },
  { value: '13', label: 'Crédito Ahorro ' },
  { value: '93', label: 'Giro referenciado ' },
  { value: '14', label: 'Débito Ahorro ' },
  { value: '94', label: 'Giro urgente ' },
  { value: '39', label: 'Crédito Intercambio Corporativo (CTX)' },
  { value: '40', label: 'Débito Intercambio Corporativo (CTX)' },
  { value: '4', label: 'Reversión débito de demanda ACH ' },
  { value: '41', label: 'Desembolso Crédito plus (CCD+)  ' },
  { value: '5', label: 'Reversión crédito de demanda ACH  ' },
  { value: '43', label: 'Desembolso Débito plus (CCD+) ' },
  { value: '6', label: 'Crédito de demanda ACH ' },
  { value: '45', label: 'Transferencia Crédito Bancario ' },
  { value: '7', label: 'Débito de demanda ACH ' },
  { value: '46', label: 'Transferencia Débito Interbancario' },
  { value: '9', label: 'Clearing Nacional o Regional ' },
  { value: '50', label: 'Postgiro ' },
  { value: '11', label: 'Reversión Crédito Ahorro ' },
  { value: '51', label: 'Telex estándar bancario ' },
  { value: '12', label: 'Reversión Débito Ahorro ' },
  { value: '52', label: 'Pago comercial urgente ' },
  { value: '18', label: 'Desembolso (CCD) débito ' },
  { value: '53', label: 'Pago Tesorería Urgente ' },
  { value: '19', label: 'Crédito Pago negocio corporativo (CTP)  ' },
  { value: '15', label: 'Bookentry Crédito ' },
  { value: '21', label: 'Poyecto bancario ' },
  { value: '16', label: 'Bookentry Débito ' },
  { value: '22', label: 'Proyecto bancario certificado ' },
  { value: '17', label: 'Desembolso Crédito (CCD) ' },
  { value: '27', label: 'Débito Pago Negocio Corporativo (CTP) ' },
  { value: '70', label: 'Retiro de nota por el por el acreedor ' },
  { value: '28', label: 'Crédito Negocio Intercambio Corporativo (CTX) ' },
  { value: '74', label: 'Retiro de nota por el por el acreedor sobre un banco ' },
  { value: '29', label: 'Débito Negocio Intercambio Corporativo (CTX) ' },
  { value: '75', label: 'Retiro de nota por el acreedor, avalada por otro banco ' },
  { value: '30', label: 'Transferencia Crédito ' },
  { value: '76', label: 'Retiro de nota por el acreedor, sobre un banco avalada por un tercero ' },
  { value: '31', label: 'Transferencia Débito ' },
  { value: '77', label: 'Retiro de una nota por el acreedor sobre un tercero ' },
  { value: '32', label: 'Desembolso Crédito plus (CCD+) ' },
  { value: '78', label: 'Retiro de una nota por el acreedor sobre un tercero avalada por un banco ' },
  { value: '33', label: 'Desembolso Débito plus (CCD+) ' },
  { value: '1', label: 'Instrumento no definido ' },
  { value: '34', label: 'Pago y depósito pre acordado (PPD) ' },
  { value: '37', label: 'Pago Negocio Corporativo Ahorros Crédito (CTP) ' },
  { value: '35', label: 'Desembolso Crédito (CCD) ' },
  { value: '38', label: 'Pago Negocio Corporativo Ahorros Débito (CTP) ' },
  { value: '36', label: 'Desembolso Débito (CCD) ' },
  { value: '97', label: 'Clearing entre partners ' },
  ];

  export const plan = [
    { value: 'SIN TARIFA', label: 'SIN TARIFA' },
    { value: 'TARIFA SIN COSTO', label: 'TARIFA SIN COSTO' },
    { value: '5 MB - BRONCE', label: '5 MB - BRONCE' },
    { value: '7 MB - PLATA', label: '7 MB - PLATA' },
    { value: '10 MB - ORO', label: '10 MB - ORO' },
    { value: '20 MB - PLATINO', label: '20 MB - PLATINO' },
    { value: 'PLAN BRONCE 5 MEGAS CON IVA', label: 'PLAN BRONCE 5 MEGAS CON IVA' },
    { value: 'PLAN ORO 10 MEGAS CON IVA', label: 'PLAN ORO 10 MEGAS CON IVA' },
    { value: 'PLAN PLATINO 20 MEGAS CON IVA', label: 'PLAN PLATINO 20 MEGAS CON IVA' },
    { value: '30MG PLAN RUBI  SIN IVA', label: '30MG PLAN RUBI  SIN IVA' },
    { value: '50MG PLAN ZAFIRO SIN IVA', label: '50MG PLAN ZAFIRO SIN IVA' },
    { value: '100MG PLAN ESMERALDA CON IVA', label: '100MG PLAN ESMERALDA CON IVA' },
    { value: 'RECONEXION', label: 'RECONEXION' },
    // Agrega más opciones según tus necesidades
  ];

