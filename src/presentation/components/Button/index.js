import React from "react";
import styles from "./index.module.css";

const Button = ({ tipoButton, tituloBotao, desabilitar = false, onClick = null }) => {
	return (
		<button className={styles.button} type={tipoButton} disabled={desabilitar} onClick={onClick}>
			{tituloBotao}
		</button>
	);
};

export default Button;
