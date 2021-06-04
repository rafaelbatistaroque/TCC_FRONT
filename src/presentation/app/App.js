import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
    appPrincipalFactory,
    arquivoFormFactory,
    obterArquivosFactory,
    boasVindasFactories,
    loginFactory,
    obterColaboradoresFactory,
    colaboradorFormFactory,
    usuarioFactory
} from "../../main/factories";
import { usuarioFormFactory } from "../../main/factories/usuarioFactories";
import { PerfilContext } from "./hooks/perfilContext";
import Rotas from "./rotas";

const App = () => {
    const { ehAutenticado, usuarioNome, ehPerfilAdministrador, limparSessao } = React.useContext(PerfilContext);

    return (
        <BrowserRouter>
            <Rotas
                login={loginFactory().build()}
                appPrincipal={appPrincipalFactory(usuarioNome, JSON.parse(ehPerfilAdministrador), limparSessao).build()}
                boasVindas={boasVindasFactories(usuarioNome).build()}
                colaboradores={obterColaboradoresFactory(ehAutenticado, JSON.parse(ehPerfilAdministrador), limparSessao).build()}
                colaboradorForm={colaboradorFormFactory(ehAutenticado).build()}
                arquivos={obterArquivosFactory(ehAutenticado, limparSessao).build()}
                usuarios={usuarioFactory(ehAutenticado, limparSessao).build()}
                arquivoForm={arquivoFormFactory(ehAutenticado, limparSessao).build()}
                usuarioForm={usuarioFormFactory(ehAutenticado, limparSessao).build()}
            />
        </BrowserRouter>
    );
};

export default App;
