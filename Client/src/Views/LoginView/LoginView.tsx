import React, { useEffect } from "react";
import styles from './LoginView.module.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { loginUser, resetState } from "../../Redux/features/userLoginSlice";
import Swal from "sweetalert2";
const LoginView: React.FC = () => {
  interface FormData {
    email: string;
    password: string;
  }
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const loginStatus = useSelector((state: RootState) => state.login.status);
  const loginError = useSelector((state: RootState) => state.login.error);
  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);
  const token = useSelector((state: RootState) => state.login.token)

  const {register, handleSubmit, formState: {errors}, setError } = useForm<FormData>({mode: "onTouched"})
const onSubmit = handleSubmit((values) => {
  dispatch(loginUser(values))
})
useEffect(() => {
   if (loginStatus === "succeeded") {
    Swal.fire({
      title: "Enhorabuena!",
      text: "Sesión iniciada con éxito!"
    })
    dispatch(resetState())
   } else if (loginStatus === "rejected") {
    setError("email", {
      type: "manual",
      message: loginError,
    });
    setError("password", {
      type: "manual",
      message: loginError,
    });
    dispatch(resetState())
  }
}, [dispatch, loginError, loginStatus, setError]);
useEffect(() => {})
 useEffect(() => {     
   if(isAuthenticated && token){
       navigate('/dashboard')
   }
 },[isAuthenticated, navigate, loginStatus, token])
  return (
    <div className={styles.container}>
      <div className={styles.contain}>
        <form action="" onSubmit={onSubmit} className={styles.form}>
          <h1>
            Iniciar sesión
          </h1>
          <div className={styles.form_contain}>
            <div className={styles.errors}>
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className={errors.email ? styles.inputErrors : styles.input}>
              <input
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Debe ingresar un correo electrónico valido",
                  },
                  required: {
                    value: true,
                    message: "El correo electrónico es requerido",
                  },
                })}
                type="text"
                placeholder=" "
              />
              <label htmlFor="">Correo electrónico</label>
            </div>
          </div>
          <div className={styles.form_contain}>
            <div className={styles.errors}>
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div
              className={errors.password ? styles.inputErrors : styles.input}
            >
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Debe ingresar una contraseña",
                  },
                  pattern: {
                    value: /(?=\w*\d)(?=.*[a-z])/,
                    message: "La contraseña al menos un numero y una letra",
                  },
                  minLength: {
                    value: 8,
                    message: "La contraseña debe de tener mínimo 8 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "La contraseña no debe de tener mas de 20 caracteres",
                  },
                })}
                type="password"
                placeholder=" "
              />
              <label htmlFor="">Contraseña</label>
            </div>
          </div>
          <div className={styles.register_login}>
          <button type="submit">Iniciar sesión</button>
          <NavLink to={'/register'}>
            <p>Si no tienes una cuenta. Regístrate aquí!</p>
          </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;