import React from 'react';
import BotaoColaborador from '../BotaoColaborador';
import styles from './index.module.css';

const ItemColaborador = ({ colaboradorId, nomeCompleto, numeroCPF, funcaoNome, deletarColaborador }) => {

    return (<div className={styles.containerItemLista}>
        <li className={styles.itemLista}>
            <div className={styles.institucional}>
                <span className={styles.nomeCompleto}>{nomeCompleto}</span>
                <span className={styles.funcaoNome}>{funcaoNome}</span>
            </div>
            <span className={styles.numeroCPF}>{numeroCPF}</span>
        </li>
        <BotaoColaborador ehEditar={true} onClick={() => console.log("editou")} />
        <BotaoColaborador onClick={() => deletarColaborador({ colaboradorId })} />
    </div>
    );

};

export default ItemColaborador;