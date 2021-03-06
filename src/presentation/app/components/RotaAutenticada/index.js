import React from "react";
import { Navigate, Route } from "react-router-dom";
import { PerfilContext } from "../../hooks/perfilContext";

export const RotaAutenticada = (props) => {
    const { ehAutenticado } = React.useContext(PerfilContext);

    return ehAutenticado ? <Route {...props} /> : <Navigate to="/login" />;
};

