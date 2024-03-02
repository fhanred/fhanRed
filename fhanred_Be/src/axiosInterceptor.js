import axios from 'axios';
import { useSelector } from 'react-redux';
import BASE_URL from './ruta/de/tu/configuracion';

// Configurar la instancia de axios con la base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const isAuthenticated = useSelector(
      (state) => state.authentication.isAuthenticated
    );


    if (isAuthenticated) {
      const token = useSelector((state) => state.authentication.token);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default axiosInstance;

