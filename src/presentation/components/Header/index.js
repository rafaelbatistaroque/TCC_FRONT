import React from "react";
import styles from "./index.module.css";
import { NavLink } from "react-router-dom";

const Header = ({ usuarioNome, ehPerfilAdministrador = false }) => {
    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <div>{usuarioNome}</div>
                <div className={styles.menu}>
                    <NavLink to="/app/colaborador/listar" activeClassName={styles.active}>Colaboradores</NavLink>
                    {ehPerfilAdministrador && <NavLink to="/app/usuario/adicionar" activeClassName={styles.active}>Usuários</NavLink>}
                    <NavLink to="/login" activeClassName={styles.active}>Login</NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;
