import React from "react";
import { Navigate, Route, Routes } from "react-router";

import RotaAutenticada from "../components/RotaAutenticada";

const Rotas = ({ login, colaborador, colaboradorForm, appPrincipal, boasVindas }) => {
    return (
        <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />
            <RotaAutenticada exact path="/app" element={appPrincipal}>
                <Route path="/" element={boasVindas} />
                <Route path="/colaborador/listar" element={colaborador} />
                <Route path="/colaborador/alterar/:id" element={colaboradorForm} />
                <Route path="/colaborador/criar/" element={colaboradorForm} />
                <Route path="/usuarios" element={colaborador} />
                <Route path="/api/v1/arquivo/:id" element={colaborador} />
            </RotaAutenticada>
            <Route path="/api/v1/arquivo/:id/:codigo" element={colaborador} />
            <Route path="/login" element={login} />
            <Route
                path="*"
                element={<h1>Erro 404 - Página não encontrada</h1>}
            />
        </Routes>
    );
};

export default Rotas;
