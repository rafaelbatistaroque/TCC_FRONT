import AutenticarUsuarioHandler from "../../features/business/services/autenticacao/AutenticarUsuarioHandler";
import { Login } from "../../presentation/app/pages";
import { API } from "../utils/constantes";
import criarDependencias from "./dependenciasFactories";

export const loginFactory = () => {
    const url = `${API.urlBase}${API.altenticacao}`;
    const { validacoes, httpServico } = criarDependencias();
    const autenticacao = new AutenticarUsuarioHandler(
        url,
        { httpServico },
        validacoes
    );

    return {
        build: () => <Login autenticar={autenticacao} />,
    };
};
