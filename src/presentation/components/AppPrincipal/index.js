import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Header';

const AppPrincipal = ({ ehPerfilAdministrador, usuarioNome }) => {
    return <>
        <Header usuarioNome={usuarioNome} ehPerfilAdministrador={ehPerfilAdministrador} />
        <div className={`container`}><Outlet /></div></>;

};

export default AppPrincipal;