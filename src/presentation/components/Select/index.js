import React from 'react';
import styles from './index.module.css';

const Select = ({ opcoes, valor, onChange }) => {
    return <select className={styles.selectElement} onChange={onChange} value={valor}>
        {opcoes.map(({ id, item }) => (<option key={id} value={id}>{item}</option>))}
    </select>;

};

export default Select;