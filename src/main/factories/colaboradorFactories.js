import AlterarColaboradorHandler from "../../features/business/services/colaboradores/AlterarColaboradorHandler";
import DeletarColaboradorHandler from "../../features/business/services/colaboradores/DeletarColaboradorHandler";
import ObterColaboradoresHandler from "../../features/business/services/colaboradores/ObterColaboradoresHandler";
import CriarColaboradorHandler from "../../features/business/services/colaboradores/CriarColaboradorHandler";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Colaboradores from "../../presentation/pages/Colaboradores";
import ColaboradorForm from "../../presentation/pages/ColaboradorForm";
import API from "../utils/urlApi";
import Validacoes from "../utils/Validacoes";
import ObterColaboradorhandler from "../../features/business/services/colaboradores/ObterColaboradorHandler";

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
    const obterColaborador = new ObterColaboradorhandler(url, { httpServico }, validacoes);
    const criarColaborador = new CriarColaboradorHandler(url, { httpServico }, validacoes);

    return {
        build: () => <ColaboradorForm
            alterarColaborador={alterarColaborador}
            obterColaborador={obterColaborador}
            criarColaborador={criarColaborador} />
    };
};

export const obterColaboradoresFactory = (token) => {
    const url = `${API.urlBase}${API.colaborador}`;
    const { httpServico } = criarDependencias(token);

    const obterColaboradores = new ObterColaboradoresHandler(url, { httpServico });

    return {
        build: () => <Colaboradores
            obterColaboradores={obterColaboradores}
            deletarColaborador={deletarColaboradorFactory(token).build()} />,
    };
};
