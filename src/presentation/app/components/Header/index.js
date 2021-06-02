import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
import { NAVEGACAO } from "../../../../main/utils/constantes";

export const Header = ({ usuarioNome, ehPerfilAdministrador = false }) => {
    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <div>{usuarioNome}</div>
                <div className={styles.menu}>
                    <NavLink to={NAVEGACAO.TELA_COLABORADORES} activeClassName={styles.active}>Colaboradores</NavLink>
                    {ehPerfilAdministrador && <NavLink to={NAVEGACAO.TELA_USUARIO_ADICIONAR} activeClassName={styles.active}>Usuários</NavLink>}
                    <NavLink to="/login" activeClassName={styles.active}>Login</NavLink>
                </div>
            </nav>
        </header>
    );
};
