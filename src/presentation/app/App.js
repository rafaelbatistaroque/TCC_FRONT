import React from "react";
import { BrowserRouter } from "react-router-dom";
import { appPrincipalFactory, arquivoFormFactory, obterArquivosFactory, boasVindasFactories, loginFactory, obterColaboradoresFactory, colaboradorFormFactory } from "../../main/factories";
import { PerfilContext } from "./hooks/perfilContext";
import Rotas from "./rotas";

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
                arquivoForm={arquivoFormFactory(ehAutenticado).build()}
            />
        </BrowserRouter>
    );
};

export default App;
