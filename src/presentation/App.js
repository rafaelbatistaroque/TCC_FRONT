import React from "react";
import { BrowserRouter } from "react-router-dom";
import { appPrincipalFactory } from "../main/factories/appPrincipalFactories";
import { obterArquivosFactory } from "../main/factories/arquivosFactories";
import { boasVindasFactories } from "../main/factories/boasVindasFactories";
import { colaboradorFormFactory, obterColaboradoresFactory } from "../main/factories/colaboradorFactories";
import loginFactory from "../main/factories/loginFactories";
import { PerfilContext } from "./hooks/perfilContext";
import Rotas from "./Rotas";

const App = () => {
    const { ehAutenticado, ehPerfilAdministrador, usuarioNome } = React.useContext(PerfilContext);

    return (
        <BrowserRouter>
            <Rotas
                login={loginFactory().build()}
                appPrincipal={appPrincipalFactory(JSON.parse(ehPerfilAdministrador), usuarioNome).build()}
                boasVindas={boasVindasFactories(usuarioNome).build()}
                colaboradores={obterColaboradoresFactory(ehAutenticado).build()}
                colaboradorForm={colaboradorFormFactory(ehAutenticado).build()}
                arquivos={obterArquivosFactory(ehAutenticado).build()}

            />
        </BrowserRouter>
    );
};

export default App;
