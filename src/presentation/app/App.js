import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
    appPrincipalFactory,
    arquivoFormFactory,
    obterArquivosFactory,
    loginFactory,
    obterColaboradoresFactory,
    colaboradorFormFactory,
    usuarioFactory
} from "../../main/factories";
import { usuarioFormFactory } from "../../main/factories/usuarioFactories";
import { PerfilContext } from "./hooks/perfilContext";
import { SnackbarProvider } from "./hooks/SnackbarContext";
import Rotas from "./rotas";

const App = () => {
    const { ehAutenticado, usuarioNome, ehPerfilAdministrador, limparSessao } = React.useContext(PerfilContext);

    return (
        <BrowserRouter>
            <SnackbarProvider>
                <Rotas
                    login={loginFactory().build()}
                    appPrincipal={appPrincipalFactory(usuarioNome, JSON.parse(ehPerfilAdministrador), limparSessao).build()}
                    colaboradores={obterColaboradoresFactory(ehAutenticado, JSON.parse(ehPerfilAdministrador), limparSessao).build()}
                    colaboradorForm={colaboradorFormFactory(ehAutenticado).build()}
                    arquivos={obterArquivosFactory(ehAutenticado, limparSessao).build()}
                    usuarios={usuarioFactory(ehAutenticado, limparSessao).build()}
                    arquivoForm={arquivoFormFactory(ehAutenticado, limparSessao).build()}
                    usuarioForm={usuarioFormFactory(ehAutenticado, limparSessao).build()}
                />
            </SnackbarProvider>
        </BrowserRouter>
    );
};

export default App;
