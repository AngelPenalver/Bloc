import React from "react";
import Logo from "./logo_blanco.png";
import { NavLink, useLocation } from "react-router-dom";
import AccountMenu from "../../assets/menuProfile";
import styles from "./NavBar.module.css";
const NavBar: React.FC = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={Logo} alt="" />
      </div>
      <div className={styles.btns_banner}>
        {location.pathname === "/" && (
          <div>
            <NavLink to={"/login"}>
              <button className={styles.btn_banner}>Iniciar sesión</button>
            </NavLink>
            <NavLink to={"/register"}>
              <button className={styles.btn_banner}>Registrarse</button>
            </NavLink>
          </div>
        )}
        {location.pathname === "/login" && (
          <div>
            <NavLink to={"/"}>
              <button className={styles.btn_banner}>Volver</button>
            </NavLink>
          </div>
        )}
        {location.pathname === "/register" && (
          <div>
            <NavLink to={"/"}>
              <button className={styles.btn_banner}>Volver</button>
            </NavLink>
          </div>
        )}
        {location.pathname.startsWith("/dashboard/note/") && (
          <div>
            <NavLink to={"/dashboard"}>
              <button className={styles.btn_banner}>Volver</button>
            </NavLink>
          </div>
        )}
      
        {location.pathname === "/dashboard" && <AccountMenu />}
      </div>
    </div>
  );
};
export default NavBar;
