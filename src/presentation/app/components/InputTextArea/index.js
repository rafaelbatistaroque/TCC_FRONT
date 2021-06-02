import React from 'react';
import styles from './index.module.css';

export const InputTextArea = ({ placeholder, nomeTextArea, quantidadeMaxCaracter, linhas, valor, onChange, requirido = false }) => {

    return <textarea
        className={styles.inputElement}
        placeholder={placeholder}
        id={nomeTextArea}
        name={nomeTextArea}
        maxLength={quantidadeMaxCaracter}
        required={requirido}
        rows={linhas}
        value={valor}
        onChange={onChange}
    ></textarea>;

};