import {
    AlterarColaboradorHandler,
    CriarColaboradorHandler,
    DeletarColaboradorHandler,
    ObterColaboradoresHandler,
    ObterColaboradorHandler
} from "../../features/business/services/colaboradores";
import { Colaboradores, ColaboradorForm } from "../../presentation/app/pages/";
import { API } from "../utils/constantes";
import criarDependencias from "./dependenciasFactories";

const deletarColaboradorFactory = (token) => {
    const url = `${API.urlBase}${API.colaborador}/`;
    const { validacoes, httpServico } = criarDependencias(token);

    const deletarColaboradores = new DeletarColaboradorHandler(url, { httpServico }, validacoes);

    return {
        build: () => deletarColaboradores,
    };
};

export const colaboradorFormFactory = (token) => {
    const url = `${API.urlBase}${API.colaborador}/`;
    const { validacoes, httpServico } = criarDependencias(token);

    const alterarColaborador = new AlterarColaboradorHandler(url, { httpServico }, validacoes);
    const obterColaborador = new ObterColaboradorHandler(url, { httpServico }, validacoes);
    const criarColaborador = new CriarColaboradorHandler(url, { httpServico }, validacoes);

    return {
        build: () => <ColaboradorForm
            alterarColaborador={alterarColaborador}
            obterColaborador={obterColaborador}
            criarColaborador={criarColaborador} />
    };
};

export const obterColaboradoresFactory = (token, ehPerfilAdministrador, limparSessao) => {
    const url = `${API.urlBase}${API.colaborador}`;
    const { httpServico } = criarDependencias(token);

    const obterColaboradores = new ObterColaboradoresHandler(url, { httpServico });

    return {
        build: () => <Colaboradores
            ehPerfilAdministrador={ehPerfilAdministrador}
            limparSessao={limparSessao}
            obterColaboradores={obterColaboradores}
            deletarColaborador={deletarColaboradorFactory(token).build()} />,
    };
};
