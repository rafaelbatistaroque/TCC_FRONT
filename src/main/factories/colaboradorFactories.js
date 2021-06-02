import {
    AlterarColaboradorHandler,
    CriarColaboradorHandler,
    DeletarColaboradorHandler,
    ObterColaboradorHandler,
    ObterColaboradoresHandler
} from "../../features/business/services/colaboradores";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import { Colaboradores, ColaboradorForm } from "../../presentation/app/pages/";
import API from "../utils/urlApi";
import Validacoes from "../utils/Validacoes";

const criarDependencias = (token) => {
    const validacoes = new Validacoes();
    const httpServico = new HttpFetchServico(token);
    return {
        validacoes,
        httpServico,
    };
};

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
