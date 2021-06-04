import React from "react";
import { SnackbarContext } from "../../hooks/SnackbarContext";
import styles from "./index.module.css";

export const Snackbar = () => {
    const { abrirSnackbar, setAbrirSnackbar, snackBarFactory, limparSnack } = React.useContext(SnackbarContext);
    const { mensagens, snackConfig, duracaoSegundos } = snackBarFactory;

    React.useEffect(() => {
        if (Object.keys(snackBarFactory).length === 0) return;

        setAbrirSnackbar(true);
        debounce();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snackBarFactory]);

    function debounce() {
        let tempo;
        if (tempo) clearTimeout(tempo);

        tempo = setTimeout(() => {
            setAbrirSnackbar(false);
            limparSnack();
            tempo = null;
        }, duracaoSegundos * 1000);
    }

    return (
        <>
            {abrirSnackbar && (
                <div className={styles.snackbarContainer}>
                    <div style={{ ...snackConfig }} className={styles.snackbar}>
                        {mensagens.length > 0 && mensagens.map((mensagem, index) => (<span key={index} style={{ ...snackConfig.COR_TEXTO }}>{mensagem}</span>))}
                    </div>
                </div>
            )}
        </>
    );
};

