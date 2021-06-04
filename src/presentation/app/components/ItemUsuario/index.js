import React from 'react';
import { Switch } from '../Switch';
import styles from './index.module.css';

export const ItemUsuario = ({ usuario, alterarStatus }) => {
    const { codigo, usuarioNome, ehUsuarioAtivo, perfilNome } = usuario;

    const [statusUsuario, setStatusUsuario] = React.useState(ehUsuarioAtivo);

    return (<div className={styles.containerItemLista}>
        <li className={styles.itemLista}>
            <div className={styles.institucional}>
                <span className={styles.usuarioNome}>{usuarioNome}</span>
                <span className={styles.codigo}>{codigo}</span>
            </div>

            <span className={styles.perfilNome}>{perfilNome} {ehUsuarioAtivo}</span>
        </li>
        <Switch codigoUsuario={`${codigo}`} valor={statusUsuario} onChange={({ target }) => { setStatusUsuario(target.checked); alterarStatus(codigo); }} />
    </div>
    );
};
