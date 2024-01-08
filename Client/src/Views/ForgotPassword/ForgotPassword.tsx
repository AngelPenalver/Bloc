import React, { useEffect, useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import {
  forgotPassword,
  sendMailForgotPassword,
} from "../../Redux/services/funtionsAsync";
import toastr from "toastr";
import { resetState } from "../../Redux/features/userLoginSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  interface inputForm {
    email: string;
    verificationCode: string;
    newPassword: string;
    confirm_password: string;
  }
  const [sendMail, setSendMail] = useState(false);
  const [verifyCode, setVerifyCode] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const sendCodeStatus = useSelector(
    (state: RootState) => state.login.status_mailForgotPassword
  );
  const resetPasswordStatus = useSelector((state: RootState) => state.login.status_ForgotPassword)
  const error = useSelector((state: RootState) => state.login.error);
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    watch,
  } = useForm<inputForm>({ mode: "onTouched" });

  const onSubmit = handleSubmit((values) => {
    dispatch(sendMailForgotPassword(values));
  });
  useEffect(() => {
    if (sendCodeStatus === "rejected") {
      setError("email", {
        type: "manual",
        message: `${error}`,
      });
      toastr.error(`${error}`);
      dispatch(resetState());
    }
    if (sendCodeStatus === "succeeded") {
      toastr.success("Se ha enviado el código a su correo electrónico");
      setVerifyCode(true);
      dispatch(resetState());
    }
  }, [dispatch, error, sendCodeStatus, setError]);
  
  const ResetPassword = handleSubmit((values) => {
    const { email, newPassword, verificationCode } = values;
    dispatch(forgotPassword({ email, newPassword, verificationCode }));
  });
  useEffect(() => {
    if (resetPasswordStatus === "rejected") {
      setError("email", {
        type: "manual",
        message: `${error}`,
      });
      toastr.error(`${error}`);
      dispatch(resetState());
    }
    if (resetPasswordStatus === "succeeded") {
      toastr.success("Su contraseña se ha recuperado con éxito");
      setVerifyCode(true);
      dispatch(resetState());
      navigate('/')
    }
    
  },[dispatch, error, navigate, resetPasswordStatus, setError])

  return (
    <div className={styles.container}>
      <div className={verifyCode ? styles.contain2 : styles.contain}>
        {!sendMail ? (
          <div className={styles.text_content2}>
            <p>
              Se enviará un código de verificación a su dirección de correo
              electrónico.{" "}
            </p>
            <p>
              Este código nos ayudará recuperar su contraseña de manera segura.
            </p>
            <button onClick={() => setSendMail(true)}>Continuar</button>
          </div>
        ) : !verifyCode ? (
          <div className={styles.text_content}>
            <form action="" onSubmit={onSubmit} className={styles.form}>
              <p>Por favor, ingrese su correo electrónico:</p>
              <div className={styles.form_contain}>
                <div className={styles.errors}>
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div
                  className={errors.email ? styles.inputErrors : styles.input}
                >
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
                    type="email"
                    placeholder=" "
                  />
                  <label htmlFor="">Correo electrónico</label>
                </div>
              </div>
              <button type="submit">Enviar código</button>
            </form>
          </div>
        ) : (
          <form action="" onSubmit={ResetPassword} className={styles.form}>
            <p>Por favor, ingrese el código enviado a su correo electrónico</p>
            <div className={styles.form_contain}>
              <div className={styles.errors}>
                {errors.verificationCode && (
                  <p>{errors.verificationCode.message}</p>
                )}
              </div>
              <div
                className={
                  errors.verificationCode ? styles.inputErrors : styles.input
                }
              >
                <input
                  {...register("verificationCode", {
                    required: {
                      value: true,
                      message: "Debe ingresar el código enviado",
                    },
                    minLength: {
                      value: 6,
                      message: "El código no puede tener mínimo de 6 dígitos",
                    },
                  })}
                  type="text"
                  placeholder=" "
                />
                <label htmlFor="">Código enviado</label>
              </div>
              <div className={styles.form_contain}>
                <div className={styles.errors}>
                  {errors.newPassword && <p>{errors.newPassword.message}</p>}
                </div>
                <div
                  className={
                    errors.newPassword ? styles.inputErrors : styles.input
                  }
                >
                  <input
                    {...register("newPassword", {
                      required: {
                        value: true,
                        message: "Debe ingresar una contraseña",
                      },

                      minLength: {
                        value: 8,
                        message:
                          "La contraseña debe de tener mínimo 8 caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "La contraseña no debe de tener mas de 20 caracteres",
                      },
                    })}
                    type="text"
                    placeholder=" "
                  />
                  <label htmlFor="">Nueva contraseña</label>
                </div>
              </div>
              <div className={styles.form_contain}>
                <div className={styles.errors}>
                  {errors.confirm_password && (
                    <p>{errors.confirm_password.message}</p>
                  )}
                </div>

                <div
                  className={
                    errors.confirm_password ? styles.inputErrors : styles.input
                  }
                >
                  <input
                    {...register("confirm_password", {
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Las contraseñas no coinciden",
                      required: {
                        value: true,
                        message: "Debe confirmar la contraseña",
                      },
                    })}
                    type="text"
                    placeholder=" "
                  />
                  <label htmlFor="">Confirmar contraseña</label>
                </div>
                <button type="submit">Cambiar contraseña</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
