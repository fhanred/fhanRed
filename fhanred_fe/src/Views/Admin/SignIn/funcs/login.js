export const login = async (userData, dispatch, credentials, userInfoAction) => {    
  const { email, password } = userData;
  try {
    const emailCapital = email.toUpperCase();
    const infoUser = { email: emailCapital, password };
    
    // Dispatch de la acción userInfo para almacenar los datos del usuario en el estado de Redux
    dispatch(userInfoAction(infoUser));

    const data = credentials.data;
    if (data) {
      console.log('Datos recibidos después del inicio de sesión:', data);
      return data;
    } else {
      console.log('No se recibieron datos después del inicio de sesión');
    }
  } catch (error) {
    console.error('Se produjo un error:', error);
  }
};

// data: {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9yb2xlIjo0LCJyYXpvbl9zb2NpYWwiOiJtZXJjZWRlc0RldiIsIm5fZG9jdW1lbnRvIjoiMTExMTExMTIiLCJlbWFpbCI6IkRFVk1FUkNFREVTQERFVi5DT00iLCJmZWNoYV9jdW1wbGUiOiIyMDI0LTAxLTA3IiwiaWF0IjoxNzA5MjE4OTM5LCJleHAiOjE3MDkzMDUzMzl9._gbag4937QKZT7aWNHaNlx-G64DXalFYcT2kz6q-eqQ",
//     "user": {
//         "id_role": 4,
//         "razon_social": "mercedesDev",
//         "n_documento": "11111112",
//         "email": "DEVMERCEDES@DEV.COM",
//         "fecha_cumple": "2024-01-07"
//     }
// }