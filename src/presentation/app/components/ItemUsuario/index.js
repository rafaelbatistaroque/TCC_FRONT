import React from 'react';
import { BotaoForm } from '../BotaoForm';
import styles from './index.module.css';

export const ItemUsuario = ({ usuario, alterarStatus }) => {
    const { codigo, usuarioNome, ehUsuarioAtivo, perfilNome } = usuario;

    return (<div className={styles.containerItemLista}>
        <li className={styles.itemLista}>
            <div className={styles.institucional}>
                <span className={styles.usuarioNome}>{usuarioNome}</span>
                <span className={styles.codigo}>{codigo}</span>
            </div>

            <span className={styles.perfilNome}>{perfilNome}</span>
        </li>
        <BotaoForm finalidade={ehUsuarioAtivo ? 6 : 7} onClick={() => alterarStatus(codigo)} />
    </div>
    );
};
