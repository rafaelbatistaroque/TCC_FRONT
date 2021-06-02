import React from 'react';
import { BotaoForm } from '..';
import styles from './index.module.css';

export const ItemArquivo = ({ arquivo, deletarArquivo, downloadArquivo }) => {

    const { id, dataCadastro, mesReferencia, anoReferencia, observacoes, anexo } = arquivo;
    const { nome, extensao, linkParaDownload } = anexo;

    return (<div className={styles.containerItemLista}>
        <li className={styles.itemLista}>
            <div className={styles.dadoArquivo}>
                <span className={styles.nomeArquivo}>{nome}</span>
                <span className={styles.dataCadastro}>CADASTRO: {dataCadastro}</span>
            </div>
            <div className={styles.grupos}>
                <span className={styles.tituloItemArquivo}>Ref</span>
                <span className={styles.valor}>{mesReferencia}/{anoReferencia}</span>
            </div>
            <div className={styles.grupos}>
                <span className={styles.tituloItemArquivo}>Formato</span>
                <span className={styles.valor}>{extensao}</span>
            </div>
            <div className={styles.grupos}>
                <span className={styles.tituloItemArquivo}>OBS</span>
                <span className={styles.valorObservacoes}>{observacoes}</span>
            </div>
        </li>
        <BotaoForm finalidade={4} onClick={() => downloadArquivo(linkParaDownload)} />
        <BotaoForm finalidade={2} onClick={() => deletarArquivo(id)} />
    </div>
    );
};