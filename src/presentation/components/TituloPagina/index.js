import React from 'react';
import styles from './index.module.css';

const TituloPagina = ({ tituloPagina }) => {

    return <h1 className={styles.titulo}>{tituloPagina}</h1>;

};

export default TituloPagina;