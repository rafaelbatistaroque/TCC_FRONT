import React from 'react';
import styles from './index.module.css';

const BotaoColaborador = ({ finalidade = 0, onClick }) => {
    const classesFinalidades = ["btnNavegar", "btnEditar", "btnDeletar"];

    if (finalidade in classesFinalidades === false)
        finalidade = 0;

    return <button finalidade={classesFinalidades[finalidade]} className={styles.botaoColaboradores} onClick={onClick}></button>;
};

export default BotaoColaborador;