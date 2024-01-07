import React, { useEffect } from "react";
import Logo from "../../Views/NavBar/logo.png";
import styles from "./Home.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Footer from "../../Views/Footer/Footer";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.login.token);
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated && token) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, token]);
  return (
    <div className={styles.cont}>
      <div className={styles.container}>
        <div className={styles.contain_img}>
          <img src={Logo} alt="Logo" />
        </div>

        <div className={styles.contain}>
        <div className={styles.text_content}>
          
            <h1>Conserva tus notas siempre a mano</h1>
            <p>
              Con este bloc de notas en línea, puedes guardar, organizar y
              acceder a todo lo que anotas desde un solo lugar. Es una
              herramienta práctica y sencilla que te hace la vida más fácil.
            </p>
          
          <div className={styles.register}>
            <NavLink to={"/register"}>
              <button>Regístrate</button>
            </NavLink>
            <NavLink to={"/login"}>
              <button>Iniciar sesión</button>
              </NavLink>
          </div>
        </  div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Home;
