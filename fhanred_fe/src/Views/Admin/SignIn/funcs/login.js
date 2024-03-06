export const login = async (userData, dispatch, credentials, userInfo) => {    
  const { email, password } = userData;
  try {
    const emailCapital = email.toUpperCase();
    const infoUser = { email: emailCapital, password };
    
    // Dispatch de la acción userInfo para almacenar los datos del usuario en el estado de Redux
    dispatch(userInfo(infoUser));

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