import React from "react";
import useLocalStorage from "./useLocalStorage";

export const PerfilContext = React.createContext();

export const PerfilProvider = ({ children }) => {
    const [ehAutenticado, setEhAutenticado] = useLocalStorage("@token/Paperless", "");
    const [perfilTipo, setPerfilTipo] = React.useState(false);
    const [usuarioNome, setUsuarioNome] = React.useState(null);

    return <PerfilContext.Provider value={{
        ehAutenticado,
        setEhAutenticado,
        perfilTipo,
        setPerfilTipo,
        usuarioNome,
        setUsuarioNome
    }}>{children}</PerfilContext.Provider>;
};
