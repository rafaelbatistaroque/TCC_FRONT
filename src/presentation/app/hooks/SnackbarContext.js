import React from "react";

export const SnackbarContext = React.createContext();

export const SnackbarProvider = ({ children }) => {
    const COR = { 0: "#303030", 1: "#3c8d46", 2: "#B42121", 3: "#575FFF", 4: "#e8c435", 5: "#fff", };
    const BORDA = { 0: "3px solid var(--cor-escura)" };
    const SNACKBAR_CONFIG_TIPO = {
        0: { background: COR[0], border: BORDA[0], COR_TEXTO: { color: COR[5] } },
        1: { background: COR[1], border: BORDA[0], COR_TEXTO: { color: COR[5] } },
        2: { background: COR[2], border: BORDA[0], COR_TEXTO: { color: COR[5] } },
        3: { background: COR[3], border: BORDA[0], COR_TEXTO: { color: COR[5] } },
        4: { background: COR[4], border: BORDA[0], COR_TEXTO: { color: COR[0] } },
    };

    const [abrirSnackbar, setAbrirSnackbar] = React.useState(false);
    const [snackBarFactory, setSnackBarFactory] = React.useState({});

    const validarMensagem = (mensagem) => {
        const texto = !mensagem || mensagem.length === 0 ? "Escreva sua mensagen aqui!" : mensagem;
        if (typeof texto === "string")
            return [texto];

        return texto;
    };

    const limparSnack = () => {
        setSnackBarFactory({});
    };

    const snackErro = (mensagem) => {
        const snack = {
            mensagens: validarMensagem(mensagem),
            snackConfig: SNACKBAR_CONFIG_TIPO[2],
            duracaoSegundos: 4,
        };

        setSnackBarFactory(snack);
    };

    const snackSucesso = (mensagem) => {
        const snack = {
            mensagens: validarMensagem(mensagem),
            snackConfig: SNACKBAR_CONFIG_TIPO[1],
            duracaoSegundos: 4,
        };

        setSnackBarFactory(snack);
    };

    return (
        <SnackbarContext.Provider value={{ abrirSnackbar, snackErro, snackSucesso, limparSnack, setAbrirSnackbar, snackBarFactory }}>
            {children}
        </SnackbarContext.Provider>
    );
};
