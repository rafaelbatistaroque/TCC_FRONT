import React from "react";
import { BrowserRouter } from "react-router-dom";
import { appPrincipalFactory } from "../main/factories/appPrincipalFactories";
import { boasVindasFactories } from "../main/factories/boasVindasFactories";
import { colaboradorAlterarFactory, obterColaboradorFactory } from "../main/factories/colaboradorFactories";
import loginFactory from "../main/factories/loginFactory";
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
                colaborador={obterColaboradorFactory(ehAutenticado).build()}
                colaboradorAlterar={colaboradorAlterarFactory(ehAutenticado).build()}
            />
        </BrowserRouter>
    );
};

export default App;
