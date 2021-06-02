import React from 'react';
import { Outlet } from 'react-router';
import { Header } from '../Header';

export const AppPrincipal = ({ ehPerfilAdministrador, limparSessao, usuarioNome }) => {
    return <>
        <Header ehPerfilAdministrador={ehPerfilAdministrador} limparSessao={limparSessao} usuarioNome={usuarioNome} />
        <div className={`container`}><Outlet /></div></>;

};