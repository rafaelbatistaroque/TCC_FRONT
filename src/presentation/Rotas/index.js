import React from "react";
import { Navigate, Route, Routes } from "react-router";
import RotaAutenticada from "../components/RotaAutenticada";

const Rotas = ({ login, colaborador }) => {
  return (
    <Routes>
      <RotaAutenticada
        exact
        path="/"
        element={<Navigate to="/colaborador" />}
      />
      <RotaAutenticada exact path="/colaborador" element={colaborador}>
        <RotaAutenticada exact path="/:id" element={colaborador} />
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
