import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { registerUser, resetState } from "../../Redux/features/userRegisterSlice";
import { Spinner } from "reactstrap";
import Swal from "sweetalert2"; 

const RegisterView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const registerStatus = useSelector(
    (state: RootState) => state.register.status
  );
  const [active, setActive] = useState(false)
  const registerError = useSelector((state: RootState) => state.register.error);
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const token = useSelector((state: RootState) => state.login.token);
  interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ mode: "onTouched" });

  const onSubmit = handleSubmit((values) => {
    dispatch(registerUser(values));
  });
  useEffect(() => {
    setTimeout(() => {      
      if (registerStatus === "succeeded") {
        Swal.fire({
          title: "Enhorabuena!",
          text: "Usuario creado con éxito!",
          icon: "success"
        });
        navigate('/')
      dispatch(resetState())
    } else if (registerStatus === "rejected") {
      Swal.fire({
        title: "Error intente de nuevo",
        text: `${registerError}`,
        icon: "error"
      });
      dispatch(resetState())
    }
  }, 1000);
  }, [dispatch, navigate, registerError, registerStatus]);
 
  useEffect(() => {
    if(registerStatus === 'loading'){
      setActive(true)
      
    }else{
      setTimeout(() => {
        
        setActive(false)
      }, 1000);
    }
  },[dispatch, registerStatus]);

  useEffect(() => {
    if (isAuthenticated && token) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, token]);

  return (
    <div className={styles.contain}>
      <div className={styles.container}>
        <form action="" onSubmit={onSubmit} className={styles.form}>
          <h1>Registrarse</h1>
          <div className={styles.form_contain}>
            <div className={styles.errors}>
              {errors.first_name && <p>{errors.first_name.message}</p>}
            </div>
            <div
              className={errors.first_name ? styles.inputErrors : styles.input}
            >
              <input
                {...register("first_name", {
                  required: { value: true, message: "El nombre es requerido" },
                })}
                type="text"
                placeholder=" "
              />
              <label htmlFor="">Nombre</label>
            </div>
          </div>
          <div className={styles.form_contain}>
            <div className={styles.errors}>
              {errors.last_name && <p>{errors.last_name.message}</p>}
            </div>
            <div
              className={errors.last_name ? styles.inputErrors : styles.input}
            >
              <input
                {...register("last_name", {
                  required: {
                    value: true,
                    message: "El apellido es requerido",
                  },
                })}
                type="text"
                placeholder=" "
              />
              <label htmlFor="">Apellido</label>
            </div>
          </div>
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
          <div className={styles.form_contain}>
            <div className={styles.errors}>
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
            <div
              className={
                errors.confirmPassword ? styles.inputErrors : styles.input
              }
            >
              <input
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                  required: {
                    value: true,
                    message: "Debe confirmar la contraseña"
                  }
                })}
                type="password"
                placeholder=" "
              />
              <label htmlFor="">Confirmar contraseña</label>
            </div>
          </div>
          <div className={styles.register_login}>
          {
            active ?

          <button disabled={true}>
            <Spinner color="dark" />
          </button>
          :
          <button type="submit">
            Registrarse
          </button>
          
          }
          <NavLink to={'/login'}>
            <p>
              ¿Ya tienes una cuenta? Inicia sesión.
            </p>
          </NavLink>
          </div>

          
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
