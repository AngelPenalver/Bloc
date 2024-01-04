import React from "react";
import styles from "./Footer.module.css";
import LinkedIn from "../../assets/Icons/LinkedIn";
import GitHub from "../../assets/Icons/GitHub";
import WhatsApp from "../../assets/Icons/WhatsApp";
import Mail from "../../assets/Icons/Mail";
const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.banner}>
        <ul>
          <li>
            <a
              href="https://github.com/AngelPenalver"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/ángel-peñalver-926bba268"
              title="Ir a LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </a>
          </li>
          <li>
            <a
              href="mailto:apenalver4@gmail.com"
              title="Enviar Correo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail />
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/+584248189165"
              title="Enviar un WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp />
            </a>
          </li>
        </ul>
      </div>

      <p>© 2023 Blocy. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
