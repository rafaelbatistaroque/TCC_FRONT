import React from 'react';
import styles from './index.module.css';

const ItemColaborador = ({ nomeCompleto, numeroCPF, funcaoNome, funcaoId }) => {

    return (<li className={styles.itemLista}>
        <div className={styles.institucional}>
            <span className={styles.nomeCompleto}>{nomeCompleto}</span>
            <span className={styles.funcaoNome}>{funcaoNome}</span>
        </div>
        <span className={styles.numeroCPF}>{numeroCPF}</span>
    </li>);

};

export default ItemColaborador;