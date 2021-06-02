import {
    CriarArquivoHandler,
    ObterArquivosHandler
} from "../../features/business/services/arquivo";
import { ObterColaboradorHandler } from "../../features/business/services/colaboradores";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import API from "../utils/urlApi";
import Validacoes from "../utils/Validacoes";
import { ArquivoForm, Arquivos } from "../../presentation/app/pages";

const criarDependencias = (token) => {
    const validacoes = new Validacoes();
    const httpServico = new HttpFetchServico(token);
    return {
        validacoes,
        httpServico,
    };
};

// const deletarArquivoFactory = (token) => {
//     const url = `${API.urlBase}${API.colaborador}/`;
//     const { validacoes, httpServico } = criarDependencias(token);

//     const deletarColaboradores = new DeletarColaboradorHandler(url, { httpServico }, validacoes);

//     return {
//         build: () => deletarColaboradores,
//     };
// };

export const arquivoFormFactory = (token) => {
    const url = `${API.urlBase}${API.arquivo}/`;
    const { validacoes, httpServico } = criarDependencias(token);

    const criarArquivo = new CriarArquivoHandler(url, { httpServico }, validacoes);

    return {
        build: () => <ArquivoForm criarArquivo={criarArquivo} />
    };
};

export const obterArquivosFactory = (token, limparSessao) => {
    const url = `${API.urlBase}${API.arquivo}/`;
    const urlColaborador = `${API.urlBase}${API.colaborador}/`;
    const { httpServico, validacoes } = criarDependencias(token);

    const obterColaborador = new ObterColaboradorHandler(urlColaborador, { httpServico }, validacoes);
    const obterArquivos = new ObterArquivosHandler(url, { httpServico });

    return {
        build: () => <Arquivos limparSessao={limparSessao} obterArquivos={obterArquivos} obterColaborador={obterColaborador} />,
    };
};
