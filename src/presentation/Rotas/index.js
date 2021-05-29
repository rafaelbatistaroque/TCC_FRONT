import React from "react";
import { Navigate, Route, Routes } from "react-router";

import RotaAutenticada from "../components/RotaAutenticada";

const Rotas = ({ login, colaborador, colaboradorAlterar, appPrincipal, boasVindas }) => {
    return (
        <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />
            <RotaAutenticada exact path="/app" element={appPrincipal}>
                <Route path="/" element={boasVindas} />
                <Route exact path="/colaborador/listar" element={colaborador} />
                <Route exact path="/colaborador/alterar/:id" element={colaboradorAlterar} />
                <Route exact path="/usuarios" element={colaborador} />
                <Route exact path="/api/v1/arquivo/:id" element={colaborador} />
            </RotaAutenticada>
            <Route exact path="/api/v1/arquivo/:id/:codigo" element={colaborador} />
            <Route exact path="/login" element={login} />
            <Route
                exact
                path="*"
                element={<h1>Erro 404 - Página não encontrada</h1>}
            />
        </Routes>
    );
};

export default Rotas;
