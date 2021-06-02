import React from "react";
import styles from "./index.module.css";

export const Button = ({ tipoButton, tituloBotao, desabilitar = false, onClick = null, estiloEnfase = true }) => {
    return (
        <button className={`${styles.button} ${(estiloEnfase ? styles.buttonEnfase : styles.buttonNormal)}`} type={tipoButton} disabled={desabilitar} onClick={onClick}>
            {tituloBotao}
        </button>
    );
};
