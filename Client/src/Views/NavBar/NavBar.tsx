import React from "react";
import Logo from './logo_blanco.png'
import styles from './NavBar.module.css'
import { useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
    
  const location = useLocation()

    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={Logo} alt="" />
            </div>
            <div className={styles.btns_banner}>
                {
                    location.pathname !== '/register' && location.pathname !== '/login' &&
                <ul>
                    <li>
                        <button>
                            Saber más
                        </button>
                    </li>
                    <li>
                        <button>
                        Iniciar sesión
                        </button>
                    </li>
                    <li>
                        <button>
                        Registrarse
                        </button>
                    </li>
                </ul>
                }
            </div>
        </div>
    )
}
export default NavBar;
