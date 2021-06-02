import React from 'react';
import { BotaoForm } from "..";
import styles from './index.module.css';

export const ItemColaborador = ({ colaborador, deletarColaborador, alterarColaborador, visualizarDocumentos, ehPerfilAdministrador }) => {

    const { id, numeroCPF, primeiroNome, sobrenome, funcaoNome } = colaborador;

    return (<div className={styles.containerItemLista}>
        <li className={styles.itemLista}>
            <div className={styles.institucional}>
                <span className={styles.nomeCompleto}>{`${primeiroNome} ${sobrenome}`}</span>
                <span className={styles.numeroCPF}>{numeroCPF}</span>
            </div>
            <span className={styles.funcaoNome}>{funcaoNome}</span>
        </li>
        <BotaoForm finalidade={0} onClick={() => visualizarDocumentos(id)} />
        <BotaoForm finalidade={1} onClick={() => alterarColaborador(id)} />
        {ehPerfilAdministrador && <BotaoForm finalidade={2} onClick={() => deletarColaborador(id)} />}
    </div>
    );

};
