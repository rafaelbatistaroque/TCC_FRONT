import React from 'react';
import { Outlet } from 'react-router';
import { Header } from '../Header';

export const AppPrincipal = ({ ehPerfilAdministrador, usuarioNome }) => {
    return <>
        <Header usuarioNome={usuarioNome} ehPerfilAdministrador={ehPerfilAdministrador} />
        <div className={`container`}><Outlet /></div></>;

};