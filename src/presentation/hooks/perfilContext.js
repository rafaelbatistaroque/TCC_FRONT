import React from "react";
import useLocalStorage from "./useLocalStorage";

export const PerfilContext = React.createContext();

export const PerfilProvider = ({ children }) => {
    const [ehAutenticado, setEhAutenticado] = useLocalStorage("@token/Paperless", "");
    const [perfilId, setPerfilId] = React.useState(0);
    const [usuarioNome, setUsuarioNome] = React.useState(null);

    return <PerfilContext.Provider value={{
        ehAutenticado,
        setEhAutenticado,
        perfilId,
        setPerfilId,
        usuarioNome,
        setUsuarioNome
    }}>{children}</PerfilContext.Provider>;
};
