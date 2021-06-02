import React from 'react';
import styles from './index.module.css';

export const InputAnexo = ({ placeHolder, onChange }) => {

    return <>
        <input className={styles.inputElement} type="file" placeholder={placeHolder} onChange={onChange} />
    </>;

};