import React from 'react';
import { BotaoForm } from '../';
import styles from './index.module.css';

export const ItemArquivo = ({ arquivo, deletarArquivo, downloadArquivo }) => {

    const { id, dataCadastro, mesReferencia, anoReferencia, observacoes, anexo } = arquivo;
    const { tipo, nome, extensao, linkParaDownload } = anexo;

    return (<div className={styles.containerItemLista}>
        <li className={styles.itemLista}>
            <div className={styles.institucional}>
                <span className={styles.nomeArquivo}>{nome}</span>
                <span className={styles.dataCadastro}>cadastro em: {dataCadastro}</span>
            </div>
            <div className={styles.grupos}>
                <span className={styles.titulo}>Referência</span>
                <span className={styles.valor}>{mesReferencia}/{anoReferencia}</span>
            </div>
            <div className={styles.grupos}>
                <span className={styles.titulo}>Formato</span>
                <span className={styles.valor}>{extensao}</span>
            </div>

        </li>
        <BotaoForm finalidade={4} onClick={() => downloadArquivo(linkParaDownload)} />
        <BotaoForm finalidade={2} onClick={() => deletarArquivo(1)} />
    </div>
    );
};