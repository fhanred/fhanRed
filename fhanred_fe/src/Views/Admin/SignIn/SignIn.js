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

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  function handleClick1() {
    // history.push('/user/signup');
  }
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    //setError(validate({ ...input, [property]: value }));

    setInput({ ...input, [property]: value });
    console.log(input);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // try {
    //   if (input.email && input.password) {
    //     await dispatch(userInfo(input));
    //     setInput({ email: '', password: '' });
    history.push('/admin/home');
    //   }
    // } catch (error) {}
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
          </label>
          <label>
            <NavLink to="/user/signinforgot">
              <span>¿Has olvidado tu contraseña?</span>
            </NavLink>
          </label>

          <button className={style.red} type="submit">
            <BsLock className={style.icon} /> Ingresar
          </button>
        </form>

        <div className={style.register}>
          <label>
            <span>¿Aún no estas registrado?</span>
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
