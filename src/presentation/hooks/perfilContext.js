import React from "react";
import useLocalStorage from "./useLocalStorage";

export const PerfilContext = React.createContext();

export const PerfilProvider = ({ children }) => {
    const PERFIL_ADM = 1;

    const [ehAutenticado, setEhAutenticado] = useLocalStorage("@token/Paperless", "");
    const [ehPerfilAdministrador, setEhPerfilAdministrador] = useLocalStorage("@perfil/Paperless", false);
    const [usuarioNome, setUsuarioNome] = useLocalStorage("@usuario/Paperless", "");
    const [colaborador, setColaborador] = React.useState("");

    const limparSessao = () => {
        setColaborador("");
        setEhAutenticado("");
        setEhPerfilAdministrador(false);
        setUsuarioNome("");
    };

    const salvarSessao = ({ token, perfilId, nomeUsuario }) => {
        setEhAutenticado(token);
        setEhPerfilAdministrador(perfilId === PERFIL_ADM);
        setUsuarioNome(nomeUsuario);
    };

    return <PerfilContext.Provider value={{
        ehAutenticado,
        ehPerfilAdministrador,
        usuarioNome,
        colaborador,
        setColaborador,
        salvarSessao,
        limparSessao
    }}>{children}</PerfilContext.Provider>;
};
