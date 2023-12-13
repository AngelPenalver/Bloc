import React from "react";
import Logo from './logo_blanco.png'
import styles from './NavBar.module.css'
import { NavLink, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
    
  const location = useLocation()

    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={Logo} alt="" />
            </div>
            <div className={styles.btns_banner}>
                {
                    location.pathname === '/'  &&
                <div>

                        <button>
                            Saber más
                        </button>
                 
                        <button>
                        Iniciar sesión
                        </button>
                    
                        <button>
                        Registrarse
                        </button>
                </div>
                 
                }
                {
                     location.pathname === '/login' && 
                    <div>
                    <NavLink to={'/'}><button>Volver</button></NavLink>
                    </div>
                }
                {
                    location.pathname === '/register' &&
                    <div>
                    <NavLink to={'/'}><button>Volver</button></NavLink>
                    </div>

                }
            </div>
        </div>
    )
}
export default NavBar;
