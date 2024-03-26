import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import style from './SignIn.module.css';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../../Redux/Actions/actions';
import { handleChange, login } from './funcs';
import { Button } from '@mui/material';

function SignIn() {
  const userRole = useSelector((state) => state.authentication.user?.id_role); // Accede al rol del usuario de manera segura
  const history = useHistory();
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.userInfo);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    handleChange(e, setErrors, setInput, input);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (input.email && input.password) {
      try {
        await login(input, dispatch, credentials, userInfo);
        if (isAuthenticated && userRole === 4) {
          history.push('/homePage');
        }
      } catch (error) {
        console.error('Se produjo un error:', error.message);
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Aún no eres usuario de Fhanred.');
      history.push('/');
    }
  }, [isAuthenticated, history]);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div>
        <form className="form-container" onSubmit={submitHandler}>
          <h2 className='form-title'>Iniciar sesión</h2>
          <label style={{ marginBottom: '16px' }}>
            <input
              type="email"
              value={input.email}
              name="email"
              placeholder="Correo electrónico"
              onChange={(e) => handleInputChange(e)}
            />
            <p className={style.error}>{errors.email}</p>
          </label>
          <label style={{ marginBottom: '16px' }}>
            <div className={style.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={input.password}
                name="password"
                placeholder="Contraseña"
                onChange={(e) => handleInputChange(e)}
              />
              {showPassword ? (
                <MdOutlineRemoveRedEye
                  className={style.eyeIcon}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <RiEyeCloseLine
                  className={style.eyeIcon}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <p className={style.error}>{errors.password}</p>
          </label>
          <label>
            <NavLink to="/forgotPassword">
              <span className='label'>¿Has olvidado tu contraseña?</span>
            </NavLink>
          </label>

          <Button type="submit" variant="contained" style={{ marginTop: '20px', display: "flex" }}>
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

