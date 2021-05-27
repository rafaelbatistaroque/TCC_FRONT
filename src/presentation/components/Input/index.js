import React from "react";
import styles from "./index.module.css";

const Input = ({ label, placeholder, tipoInput = "text", minParaData, valor, nomeInput, requirido = false, onChange , onFocus}) => {
	return (
		<>
			<input
				className={styles.inputElement}
				type={tipoInput}
				id={nomeInput}
				name={nomeInput}
				value={valor}
				min={minParaData}
				onChange={onChange}
				onFocus={onFocus}
				placeholder={placeholder}
				required={requirido}
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
