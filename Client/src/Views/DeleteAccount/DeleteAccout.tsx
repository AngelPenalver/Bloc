/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import styles from "./DeleteAccount.module.css";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { Modal } from "@mui/material";
import CircularIndeterminate from "../../assets/loading";
import { ocultarCorreo } from "../../assets/ocultarCorreo";
import { useDispatch } from "react-redux";
import {
  deleteAccount,
  logout,
  resetState,
  sendDeleteCode,
} from "../../Redux/features/userLoginSlice";
import toastr from "toastr";
import useTimer from "../../assets/temporizador";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DeleteAccount: React.FC = () => {
  interface deleteAttribute {
    verificationCode: string;
  }
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.login.userData);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const statusCode = useSelector(
    (state: RootState) => state.login.status_deleteCode
  );
  const statusDelete = useSelector(
    (state: RootState) => state.login.status_deleteAccount
  );
  const error = useSelector((state: RootState) => state.login.error);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.login.userId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<deleteAttribute>({ mode: "onTouched" });
  console.log(statusCode);

  const {
    timer: resendCode,
    setTimer,
    setStart,
    resend,
    setResend,
  } = useTimer(120);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  const handleResendCode = () => {
    if (userId) {
      dispatch(resetState());
      setResend(false);
      setTimer(180);
      dispatch(sendDeleteCode({ userId }));
      setStart(true);
      toastr.success(
        "El código de verificación ha sido enviado a su correo electrónico"
      );
    }
  };
  useEffect(() => {
    if (statusCode === "succeeded") {
      setLoading(false);
      setChange(true);
      setTimer(120);
      setStart(true);
      toastr.success(
        "El código de verificación ha sido enviado a su correo electrónico"
      );
      dispatch(resetState());
    }
    if (statusCode === "rejected") {
      if (error && change === false) {
        setChange(false);
        toastr.error("Ha ocurrido un error");
        setLoading(false);
        setLoading(false);
      }
      dispatch(resetState());
    }
  }, [change, dispatch, error, setStart, setTimer, statusCode]);
  const handleCode = () => {
    setLoading(true);
    if (userId) {
      dispatch(sendDeleteCode({ userId }));
    }
  };
  const onSubmit = handleSubmit((values) => {
    dispatch(resetState());
    if (userId) {
      Swal.fire({
        title: "¿Seguro que deseas eliminar la cuenta?",
        icon: "warning",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cerrar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true)
          dispatch(deleteAccount({ ...values, userId }));
        }
      });
    }
  });
  useEffect(() => {
    setTimeout(() => {
      
      if (statusDelete === "succeeded") {
        toastr.success("Su cuenta ha sido eliminada con éxito!");
        navigate("/");
        dispatch(logout())
        dispatch(resetState());
        setLoading(false)
      }
      if (statusDelete === "rejected") {
        toastr.error(`${error}`);
        setLoading(false)
        dispatch(resetState());
      }
    }, 1500);
  }, [dispatch, error, navigate, statusDelete]);
  useEffect(() => {
    if (statusDelete === "rejected") {
      setError("verificationCode", {
        type: "manual",
        message: `${error}`,
      });
    }
  }, [change, error, setError, statusDelete]);

  return (
    <div className={styles.container}>
      {!loading ? (
        <div className={styles.contain}>
          {change ? (
            <div className={styles.form_input}>
              <form action="" onSubmit={onSubmit}>
                <p>
                  Ingrese el código enviado a tu correo electrónico{" "}
                  <strong>
                    {userData?.email && ocultarCorreo(userData?.email)}.
                  </strong>
                </p>
                <div className={styles.input_content}>
                  <div className={styles.errors}>
                    {errors.verificationCode && (
                      <p>{errors.verificationCode.message}</p>
                    )}
                  </div>
                  <div
                    className={
                      errors.verificationCode
                        ? styles.inputErrors
                        : styles.input
                    }
                  >
                    <input
                      {...register("verificationCode", {
                        minLength: {
                          value: 6,
                          message:
                            "El código no puede tener menos de 6 números",
                        },
                        required: {
                          value: true,
                          message: "Debe ingresar el código enviado",
                        },
                      })}
                      type="text"
                      maxLength={6}
                      placeholder=" "
                    />
                    <label htmlFor="">Código</label>
                  </div>
                </div>
                <button type="submit">Eliminar cuenta</button>
              </form>
              {resend ? (
                <p>
                  ¿No recibió ningún código?{" "}
                  <a className={styles.resend} onClick={handleResendCode}>
                    Reenviar código
                  </a>
                </p>
              ) : (
                <p>
                  Para volver a solicitar un código espere {resendCode}{" "}
                  segundos.
                </p>
              )}
            </div>
          ) : (
            <div className={styles.text}>
              <p>
                Se le enviara un código a su correo electrónico
                <strong>
                  {" "}
                  {userData?.email && ocultarCorreo(userData?.email)}{" "}
                </strong>
                para confirmar su eliminación.
              </p>
              <button onClick={handleCode}>Enviar código</button>
            </div>
          )}
        </div>
      ) : (
        <Modal open={loading}>
          <CircularIndeterminate />
        </Modal>
      )}
    </div>
  );
};
export default DeleteAccount;
