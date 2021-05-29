import React from "react";
import { Navigate, Route, Routes } from "react-router";
import ColaboradorOutlet from "../components/ColaboradorOutlet";
import RotaAutenticada from "../components/RotaAutenticada";

const Rotas = ({ login, colaborador, colaboradorEditar }) => {
    return (
        <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />
            <RotaAutenticada exact path="/colaborador" element={<ColaboradorOutlet />}>
                <Route exact path="/listar" element={colaborador} />
                <Route exact path="/editar/:id" element={colaboradorEditar} />
            </RotaAutenticada>
            <RotaAutenticada exact path="/usuarios" element={colaborador} />
            <RotaAutenticada exact path="/api/v1/arquivo/:id" element={colaborador} />
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
