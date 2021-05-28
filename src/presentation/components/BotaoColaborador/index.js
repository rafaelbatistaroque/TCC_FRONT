import React from 'react';
import styles from './index.module.css';

const BotaoColaborador = ({ ehEditar = false, onClick }) => {
    return <button finalidade={`${ehEditar ? "btnEditar" : "btnDeletar"}`} className={styles.botao} onClick={onClick}>Icone</button>;
};

export default BotaoColaborador;