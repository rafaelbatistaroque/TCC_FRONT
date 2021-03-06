import React from 'react';
import styles from './index.module.css';

export const BotaoForm = ({ finalidade = 0, onClick }) => {
    const classesFinalidades = ["btnNavegar", "btnEditar", "btnDeletar", "btnNovo", "btnDownload", "btnVoltar", "switch_on", "switch_off", "btnNovoDoc"];

    if (finalidade in classesFinalidades === false)
        finalidade = 0;

    return <button finalidade={classesFinalidades[finalidade]} className={styles.botaoForm} onClick={onClick}></button>;
};