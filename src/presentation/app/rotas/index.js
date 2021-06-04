import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { ROTA } from "../../../main/utils/constantes";
import { RotaAutenticada } from "../components";

const Rotas = ({ login, colaboradores, colaboradorForm, appPrincipal, boasVindas, arquivos, arquivoForm, usuarios, usuarioForm }) => {
    return (
        <Routes>
            <Route exact path={ROTA.ROOT} element={<Navigate to="/login" />} />
            <RotaAutenticada exact path={ROTA.APP} element={appPrincipal}>
                <Route path={ROTA.ROOT} element={boasVindas} />
                <Route path={ROTA.COLABORADORES_LISTAR} element={colaboradores} />
                <Route path={ROTA.COLABORADOR_ALTERAR_ID} element={colaboradorForm} />
                <Route path={ROTA.COLABORADOR_CRIAR} element={colaboradorForm} />
                <Route path={ROTA.ARQUIVO_LISTAR_ID} element={arquivos} />
                <Route path={ROTA.ARQUIVO_CRIAR_ID} element={arquivoForm} />
                <Route path={ROTA.USUARIO_LISTAR} element={usuarios} />
                <Route path={ROTA.USUARIO_CRIAR} element={usuarioForm} />
            </RotaAutenticada>
            <Route path={ROTA.DOWNLOAD_ARQUIVO} element={colaboradores} />
            <Route path={ROTA.LOGIN} element={login} />
            <Route
                path="*"
                element={<h1>Erro 404 - Página não encontrada</h1>}
            />
        </Routes>
    );
};

export default Rotas;
