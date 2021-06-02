import React from 'react';
import { TituloPagina } from '../../components';

export const BoasVindas = ({ usuarioNome }) => {
    return <section className={`conteudo`}>
        <TituloPagina tituloPagina={`Olá, ${usuarioNome}`} />
    </section>;

};