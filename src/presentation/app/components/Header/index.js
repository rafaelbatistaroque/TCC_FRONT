import React from "react";
import { NavLink } from "react-router-dom";
import { NAVEGACAO } from "../../../../main/utils/constantes";
import styles from "./index.module.css";

export const Header = ({ ehPerfilAdministrador, limparSessao, usuarioNome }) => {

    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <div className={styles.identificacaoLogado}>
                    <span>Usuário Logado:</span>
                    <span>{usuarioNome}</span>
                </div>
                <div className={styles.menu}>
                    <NavLink to={NAVEGACAO.TELA_COLABORADORES} activeClassName={styles.active}>Colaboradores</NavLink>
                    {ehPerfilAdministrador && <NavLink to={NAVEGACAO.TELA_USUARIO_CRIAR} activeClassName={styles.active}>Usuários</NavLink>}
                    <NavLink to={NAVEGACAO.TELA_LOGIN} activeClassName={styles.active} onClick={limparSessao}>Sair</NavLink>
                </div>
            </nav>
        </header>
    );
};
