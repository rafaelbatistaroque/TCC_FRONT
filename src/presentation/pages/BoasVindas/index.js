import React from 'react';
import { TituloPagina } from '../../components';

const BoasVindas = ({ usuarioNome }) => {
    return <section className={`conteudo`}>
        <TituloPagina tituloPagina={`Olá, ${usuarioNome}`} />
    </section>;

};

export default BoasVindas;