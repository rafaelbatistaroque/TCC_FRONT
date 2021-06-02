import React from 'react';
import styles from './index.module.css';

export const CaixaMensagem = ({ textoMensagem }) => {
    return <div className={`${styles.container} animarFadeInDeCima`}>
        {textoMensagem.map((mensagem, index) => <span key={index} className={styles.textoMensagem}>{mensagem}</span>)}
    </div>;

};