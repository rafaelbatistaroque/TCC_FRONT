import React from "react";
import { Navigate, Route, Routes } from "react-router";

import RotaAutenticada from "../components/RotaAutenticada";

const Rotas = ({ login, colaboradores, colaboradorForm, appPrincipal, boasVindas, arquivos }) => {
    return (
        <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />
            <RotaAutenticada exact path="/app" element={appPrincipal}>
                <Route path="/" element={boasVindas} />
                <Route path="/colaborador/listar" element={colaboradores} />
                <Route path="/colaborador/alterar/:id" element={colaboradorForm} />
                <Route path="/colaborador/criar/" element={colaboradorForm} />
                <Route path="/arquivo/listar/:id" element={arquivos} />
                <Route path="/usuarios" element={colaboradores} />
                <Route path="/api/v1/arquivo/:id" element={colaboradores} />
            </RotaAutenticada>
            <Route path="/api/v1/arquivo/:id/:codigo" element={colaboradores} />
            <Route path="/login" element={login} />
            <Route
                path="*"
                element={<h1>Erro 404 - Página não encontrada</h1>}
            />
        </Routes>
    );
};

export default Rotas;
