/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./ChangePassword.module.css";
import { useForm } from "react-hook-form";
import {
  resetState,
} from "../../Redux/features/userLoginSlice";
import { Modal } from "@mui/material";
import CircularIndeterminate from "../../assets/loading";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import toastr from "toastr";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import IconsBack from "../../assets/iconsBack";
import { changePassword } from "../../Redux/services/funtionsAsync";

const ChangePassword: React.FC = () => {
  interface ChangePasswordAttribute {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<ChangePasswordAttribute>({ mode: "onTouched" });
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state: RootState) => state.login.userId);
  const error = useSelector((state: RootState) => state.login.error);
  const status = useSelector((state: RootState) => state.login.status);
  const navigate = useNavigate();

  const onSubmit = handleSubmit((values) => {
    Swal.fire({
      title: "¿Seguro que deseas cambiar la contraseña?",
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
        if (userId) {
          dispatch(changePassword({ ...values, userId }));
        }
      }
    });
  });
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [loading]);
  
  useEffect(() => {
    dispatch(resetState());
    if (status === "succeeded") {
      toastr.success("Contraseña cambiada con exito!");
      navigate(`/profile/${userId}`);
      dispatch(resetState());
    }
    if (status === "rejected") {
      setError("oldPassword", {
        type: "manual",
        message: `${error}`,
      });

      dispatch(resetState());
    }
  }, [dispatch, error, status, setError, navigate]);

  return (
    <div className={styles.container}>
      {!loading ? (
        <div className={styles.contain}>
          <div>
            <NavLink to={`/profile/${userId}`}>
              <IconsBack />
            </NavLink>
            <h1>Cambio de contraseña</h1>
          </div>
          <form action="" onSubmit={onSubmit} className={styles.form}>
            <div className={styles.input_contain}>
              <div className={styles.errors}>
                {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
              </div>
              <div
                className={
                  errors.oldPassword ? styles.inputErrors : styles.input
                }
              >
                <input
                  {...register("oldPassword", {
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
                    required: {
                      value: true,
                      message: "Debe ingresar la contraseña antigua",
                    },
                  })}
                  type="password"
                  placeholder=" "
                />
                <label>Contraseña antigua</label>
              </div>
            </div>
            <div className={styles.input_contain}>
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

                    required: {
                      value: true,
                      message: "Debe ingresar la nueva contraseña",
                    },
                  })}
                  type="password"
                  placeholder=" "
                />
                <label>Contraseña nueva</label>
              </div>
            </div>
            <div className={styles.input_contain}>
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
                    minLength: {
                      value: 8,
                      message:
                        "La contraseña debe de tener mínimo 8 caracteres",
                    },
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Las contraseñas no coinciden",
                    maxLength: {
                      value: 20,
                      message:
                        "La contraseña no debe de tener mas de 20 caracteres",
                    },
                    required: {
                      value: true,
                      message: "Debe confirmar la contraseña",
                    },
                  })}
                  type="password"
                  placeholder=" "
                />
                <label>Confirma contraseña</label>
              </div>
            </div>
            <button type="submit">Cambiar contraseña</button>
          </form>
        </div>
      ) : (
        <Modal open={loading}>
          <CircularIndeterminate />
        </Modal>
      )}
    </div>
  );
};
export default ChangePassword;
