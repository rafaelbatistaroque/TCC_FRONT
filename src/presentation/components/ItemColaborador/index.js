import React from 'react';
import BotaoColaborador from '../BotaoColaborador';
import styles from './index.module.css';

const ItemColaborador = ({ colaborador, deletarColaborador, alterarColaborador }) => {

    const { id, numeroCPF, nomeCompleto, funcaoNome } = colaborador;

    return (<div className={styles.containerItemLista}>
        <li className={styles.itemLista}>
            <div className={styles.institucional}>
                <span className={styles.nomeCompleto}>{nomeCompleto}</span>
                <span className={styles.numeroCPF}>{numeroCPF}</span>
            </div>
            <span className={styles.funcaoNome}>{funcaoNome}</span>
        </li>
        <BotaoColaborador finalidade={0} onClick={() => console.log("navegar")} />
        <BotaoColaborador finalidade={1} onClick={() => alterarColaborador(id)} />
        <BotaoColaborador finalidade={2} onClick={() => deletarColaborador(id)} />
    </div>
    );

};

export default ItemColaborador;