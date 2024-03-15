import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import style from './SignIn.module.css';
import { BsLock } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../../Redux/Actions/actions';
import { handleChange, login } from './funcs';

function SignIn() {
  
  const userRole = useSelector((state) => state.authentication.user ? state.authentication.user.id_role : null);

  const history = useHistory();
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.userInfo);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);


  function handleClick1() {
    history.push('/signup');
  }
 

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
        if (isAuthenticated  && userRole === 4 ) {
          history.push('/homePage');
        }else{
          setLoginError('No eres administrador.'); 
        }
      } catch (error) {
        console.error('Se produjo un error:', error.message);
        setLoginError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated ) {
      alert('No eres administrador.');
      history.push('/');
    }
  }, [isAuthenticated,  history ]);

  return (
    <div className={style.container}>
      <div className={style.form}>
        <h1>Iniciar sesión</h1>
        {loginError && <p className={style.error}>{loginError}</p>}

        <form onSubmit={submitHandler}>
          <label>
            <input
              type="email"
              value={input.email}
              name="email"
              placeholder="Correo electrónico"
              onChange={(e) => handleInputChange(e)}
            />
            <p className={style.error}>{errors.email}</p>
          </label>
          <label>
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
              <span>¿Has olvidado tu contraseña?</span>
            </NavLink>
          </label>

          <button className={style.red} type="submit">
            <BsLock className={style.icon} /> Ingresar
          </button>
        </form>

        
      </div>
    </div>
  );
}

export default SignIn;
