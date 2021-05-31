import React from "react";
import styles from "./index.module.css";

const Input = ({ placeholder, tipoInput = "text", maxCaracteres = null, valor, nomeInput, requirido = false, onChange, onFocus, disabled = false }) => {
    return (
        <>
            <input
                className={styles.inputElement}
                type={tipoInput}
                id={nomeInput}
                name={nomeInput}
                value={valor}
                onChange={onChange}
                onFocus={onFocus}
                placeholder={placeholder}
                required={requirido}
                disabled={disabled}
                maxLength={maxCaracteres}
            />
        </>
    );
};

export default Input;
