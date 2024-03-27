import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import style from "./ChangePassword.module.css";
import { BsLock } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { userInfo } from "../../../Redux/Actions/actions";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  //estados nuevos

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({});

  function handleClick1() {
    history.push("/signup");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La nueva contraseña y la confirmación no coinciden.",
      });
    }

    if (newPassword.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña nueva debe tener al menos 8 caracteres.",
      });

      return;
    }

    let changePasswordPayload = {
      currentPassword,
      newPassword,
    };
    try {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "La contraseña fue cambiada exitosamente.",
      });
    } catch (error) {}
  };

  const setMessageColor = () => {
    return message.success ? "green" : "red";
  };

  const validatePassword = () => {
    console.log("hola");
    if (newPassword !== confirmPassword) {
      console.log("las contraseñas no coinciden");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La nueva contraseña y la confirmación no coinciden.",
      });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({
        success: false,
        text: "La contraseña nueva debe tener al menos 8 caracteres",
      });
      return;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <h1>Cambiar contraseña</h1>

        <form onSubmit={submitHandler}>
          <label htmlFor="currentPassword">
            <div className={style.passwordInput}>
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                name="password"
                placeholder="Contraseña actual"
                onChange={(e) => setCurrentPassword(e.target.value)}
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
            <div className={style.passwordInput}>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                name="email"
                placeholder="Contraseña nueva"
                onChange={(e) => setNewPassword(e.target.value)}
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
          {/*copia de contraseña*/}
          <label>
            <div className={style.passwordInput}>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                name="password"
                placeholder="Repetir contraseña"
                onChange={(e) => setConfirmPassword(e.target.value)}
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

          <button className={style.red} type="submit">
            <BsLock className={style.icon} /> Cambiar contraseña
          </button>
        </form>

        <div className={style.register}>
          <label>
            <span style={{ color: message.success ? "green" : "red" }}>
              {message ? message.text : ""}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
