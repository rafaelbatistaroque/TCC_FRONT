import React from 'react';
import styles from './index.module.css';

export const TituloPagina = ({ tituloPagina }) => {

    return <h1 className={styles.titulo}>{tituloPagina}</h1>;

};
