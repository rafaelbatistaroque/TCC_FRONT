import React from "react";
import styles from "./index.module.css";
import { NavLink } from "react-router-dom";

const Header = ({ ehPerfilAdministrador = false }) => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <div className={styles.menu}>
          <NavLink to="/colaborador" end activeClassName={styles.active}>Colaboradores</NavLink>
          {ehPerfilAdministrador && <NavLink to="/task/adicionar" activeClassName={styles.active}>
            Usuários
          </NavLink>}
          <NavLink to="/login" activeClassName={styles.active}>Login</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
