import React from 'react';
import styles from './index.module.css';

export const Switch = ({ codigoUsuario, onClick, onChange, valor }) => {

    return <>
        <div className={styles.containerSwitch}>
            <div className={styles.grupoVertical}>
                <input id={codigoUsuario} onClick={onClick} onChange={onChange} checked={valor} className={styles.inputSwitch} type="checkbox" />
                <label htmlFor={codigoUsuario} className={styles.inputSwitchBackGround} style={{}}></label>
            </div>
        </div>
    </>;

};