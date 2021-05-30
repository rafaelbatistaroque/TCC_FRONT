import React from "react";
import styles from "./index.module.css";

const Input = ({ label, placeholder, tipoInput = "text", valor, nomeInput, requirido = false, onChange, onFocus, disabled = false }) => {
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
            />
            {label && (
                <label className={styles.inputLabel} htmlFor={nomeInput}>
                    {label}
                </label>
            )}
        </>
    );
};

export default Input;
