import BASE_URL from '../../Config';

import axios from "axios";
import {
  SIGNIN_USER,
  LOGOUT_USER,
  CLEAN_DETAIL,
  CREATE_INVOICE,
  INCREMENT_NUMBER_FACT,
  CREATE_USER,
  GET_USERS,
  FETCH_CONTRACT_DETAILS_SUCCESS,
  FETCH_CONTRACT_DETAILS_FAILURE,
  FETCH_LAST_RECEIPT_NUMBER_SUCCESS,
  FETCH_LAST_RECEIPT_NUMBER_FAILURE,
  FETCH_SUMMARY_REQUEST,
  FETCH_SUMMARY_SUCCESS,
  FETCH_SUMMARY_FAILURE,
  CLEAN_CONTRACT_DETAILS,
  SEND_PAYMENT_REQUEST,
  SEND_PAYMENT_SUCCESS,
  SEND_PAYMENT_FAILURE

} from "./actions-types";

export const userInfo = (input) => async (dispatch) => {
  try {
    console.log('input: ', input)
    const dataUser = await axios.post(`${BASE_URL}/auth/login`, input);
    console.log('status: ', dataUser.status);

    if (!dataUser.status) {
      return dispatch(cleanDetail());
    }

    if (dataUser.data.data && dataUser.data.data.token) {
      console.log('data_user: ', dataUser.data.data.token);
      return dispatch({ type: SIGNIN_USER, payload: dataUser.data });
    } else {
      return dispatch({ type: SIGNIN_USER, payload: { message: 'Error al Iniciar Sesión' } });
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return dispatch(cleanDetail());
  }
};

export const logout = () => async (dispatch) => {
    try {
      const userLogout = { message: 'User is logout' }
      dispatch({ type: LOGOUT_USER, payload: userLogout })
      dispatch(cleanDetail())
    } catch (error) {
      console.error('Error: ', error)
    }
}

export const getUsers = () => async (dispatch) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/user`);
      dispatch({ type: GET_USERS, payload: data.data.users });
  } catch (error) {}
};

export const createInvoice = (input) => async (dispatch) => {
  try {
    console.log('data formik: ', input)
    const { data } = await axios.post(`${BASE_URL}/contract`, input);
    dispatch({ type: CREATE_INVOICE, payload: data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const createUser = (input) => async (dispatch) => {
  try {
    const { data } = await axios.post(      
      `${BASE_URL}/auth/signup`,
      input
    );
    dispatch({ type: CREATE_USER, payload: data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const incrementNumberFact = () => ({
  type: INCREMENT_NUMBER_FACT,
});

export const cleanDetail = () => {
  try {
    return {
      type: CLEAN_DETAIL,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchContractDetailsSuccess = (combinedData) => ({
  type: FETCH_CONTRACT_DETAILS_SUCCESS,
  payload: combinedData,
});

export const fetchContractDetailsFailure = (errorMessage) => ({
  type: FETCH_CONTRACT_DETAILS_FAILURE,
  payload: errorMessage,
});

export const fetchUserContracts = async (n_documento) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${n_documento}`);
    console.log("Response data:", response.data);
    
    const { Contracts, name_razonSocial } = response.data.data; 
    console.log("Contracts:", Contracts);
    console.log("name_razonSocial:", name_razonSocial); 
    
    const activeContracts = Contracts.filter(contract => contract.estado_contrato === "ACTIVO");
    return { contracts: activeContracts, name_razonSocial }; 
  } catch (error) {
    console.error("Error al obtener los contratos del usuario:", error);
    return { contracts: [], name_razonSocial: null }; 
  }
};

export const fetchLastReceiptNumber = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/caja`);
    const receipts = response.data.data; // Obtener el arreglo de recibos

    
    const lastReceiptNumber = receipts.reduce((maxReceipt, currentReceipt) => {
      return Math.max(maxReceipt, currentReceipt.receipt);
    }, 0);

    dispatch({
      type: FETCH_LAST_RECEIPT_NUMBER_SUCCESS,
      payload: lastReceiptNumber
    });
  } catch (error) {
    console.error("Error al generar el número de recibo:", error);
    dispatch({
      type: FETCH_LAST_RECEIPT_NUMBER_FAILURE,
      payload: error.message 
    });
  }
};


export const fetchContractDetails = async (n_contrato) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/contract/${n_contrato}`
    );
    const { Plan, Delivery } = response.data.data; 

    return { Plan, municipio: Delivery.municipio, direccion: Delivery.direccion };
  } catch (error) {
    console.error("Error al obtener los detalles del contrato:", error);
    return {};
  }
};
export const cleanContract = () => ({
  type: CLEAN_CONTRACT_DETAILS,
});

export const fetchSummary = (n_documento) => async (dispatch) => {
  dispatch({ type: FETCH_SUMMARY_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/summary/${n_documento}`);
    const { bills, debitNotes, creditNotes, cash, user, saldo } = response.data.data;
   
    console.log("Response data:", response.data)
   
    const formattedBills = formatBills(bills);
    const formattedDebitNotes = formatDebitNotes(debitNotes);
    const formattedCreditNotes = formatCreditNotes(creditNotes);
    const formattedCash = formatCash(cash);
    
    
    dispatch({
      type: FETCH_SUMMARY_SUCCESS,
      payload: {
        user,
        saldo,
        formattedBills,
        formattedDebitNotes,
        formattedCreditNotes,
        formattedCash
      }
    });
  } catch (error) {
    dispatch({ type: FETCH_SUMMARY_FAILURE, payload: error.message });
  }
};


const formatBills = (bills) => {
  console.log("Bills data:", bills);
  return bills.map((bill) => ({
    id: bill.id,
    type: 'Bill',
    date: bill.issue_date,
    amount: bill.price,
    qrUrl: extractQRUrl(bill.qrcode)
  }));
};

const formatDebitNotes = (debitNotes) => {
  console.log("DebitNotes data:", debitNotes);
  return debitNotes.map((debitNotes) => ({
    id: debitNotes.id,
    type: 'DebitN',
    date: debitNotes.issue_date,
    amount: debitNotes.price,
    qrUrl: extractQRUrl(debitNotes.qrcode)
    }))
  };

const formatCreditNotes = (creditNotes) => {
  console.log("CreditNotes data:", creditNotes);
  return creditNotes.map((creditNotes) => ({
    id: creditNotes.id,    type: 'CreditN',
    date: creditNotes.issue_date,
    amount: creditNotes.price,
    qrUrl: extractQRUrl(creditNotes.qrcode)
    }));
  };

  const formatCash = (cash) => {
    console.log("Data received in formatCash:", cash); // Verifica los datos recibidos dentro de formatCash
  
    const formattedCash = cash.map((cashItem) => ({
      type: 'Cash',
      date: cashItem.paymentDate, // Asegúrate de que el campo de fecha sea correcto
      amount: cashItem.importe  // Asegúrate de que el campo de monto sea correcto
    }));
  
    console.log("Formatted Cash:", formattedCash); // Verifica los datos formateados antes de devolverlos
  
    return formattedCash;
  };

  const extractQRUrl = (qrcode) => {
    const matches = qrcode.match(/QRCode=(.*)/);
    return matches ? matches[1] : null;
  };

  export const sendPayment = (values) => {
    return async (dispatch) => {
      dispatch({ type: SEND_PAYMENT_REQUEST });
      try {
        const response = await axios.post(`${BASE_URL}/caja`, values);
        dispatch({ type: SEND_PAYMENT_SUCCESS, payload: response.data });
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        dispatch({ type: SEND_PAYMENT_FAILURE, payload: error.message });
      }
    };
  };
  


//   [
//     {
//         "receipt": 1,
//         "contract": "60",
//         "paymentDate": "2024-02-22T00:00:00.000Z",
//         "paymentTime": "17:23",
//         "username": "GUERRA TRUJILLO, NICOLAS ",
//         "municipio": "CUMARAL",
//         "direccion": "MANZANA A .CASA 19 ESTRATO 1",
//         "importe": 66000,
//         "description": "7 MG - PLATA",
//         "paymentMethod": "Davivienda",
//         "cashierName": "mariam",
//         "createdAt": "2024-02-22T20:23:57.466Z",
//         "updatedAt": "2024-02-22T20:23:57.466Z",
//         "n_documento": "1119889568"
//     },
   
// ]






