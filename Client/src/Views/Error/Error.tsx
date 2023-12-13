import React from "react";
import styles from './Error.module.css'
import { NavLink } from "react-router-dom";


const Error: React.FC = () => {
    return( 
        <div className={styles.container}>
            <div className={styles.content}>
            <p>
            Necesita iniciar sesión para poder ingresar a esta sección
            </p>
            <NavLink to={'/login'}>
            <button>
                Iniciar sesión
            </button>
            </NavLink>
            <p>
            O
            </p>
            <NavLink to={'/register'}>
            <button>
                Registrarse
            </button>
            </NavLink>
            </div>
        </div>
    )
}
export default Error;