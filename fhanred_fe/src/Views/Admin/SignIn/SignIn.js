import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import style from './SignIn.module.css';
import { BsLock } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { userInfo } from '../../../Redux/Actions/actions';

function SignIn({login}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
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

  const handleChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;

    // Validación de email
    if (property === 'email') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !value
          ? 'Este campo es obligatorio. Por favor ingrese un correo electrónico.'
          : !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
          ? 'El correo no es válido.'
          : '',
      }));
    }

    // Validación de password
    if (property === 'password') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: !value
          ? 'Este campo es obligatorio. Por favor ingrese una contraseña válida.'
          : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              value
            )
          ? 'La contraseña debe tener al menos 8 caracteres, al menos una letra minúscula, al menos una letra mayúscula, al menos un número y al menos un carácter especial.'
          : '',
      }));
    }

    setInput({ ...input, [property]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // Validar nuevamente antes de enviar al servidor si es necesario
    if (input.email && input.password) {
      try {
        // Puedes dispatch aquí si es necesario
        // await dispatch(userInfo(input));
        // setInput({ email: '', password: '' });
        const resp = await login(input)
        console.log('resp: ', resp.token)
        if(resp.token){
          history.push('/admin/home')
        }
      } catch (error) {
        // Manejar errores si es necesario
        console.log('se a producido un error: ', error.message)
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <h1>Iniciar sesión</h1>
        <form onSubmit={submitHandler}>
          <label>
            <input
              type="email"
              value={input.email}
              name="email"
              placeholder="Correo electrónico"
              onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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

        <div className={style.register}>
          <label>
            <span>¿Aún no estás registrado?</span>
          </label>

          <button className={style.red} onClick={handleClick1}>
            <FaUser className={style.icon} /> Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
