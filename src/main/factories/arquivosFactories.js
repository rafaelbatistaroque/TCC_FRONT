import {
    CriarArquivoHandler,
    ObterArquivosHandler,
    DeletarArquivoHandler
} from "../../features/business/services/arquivo";
import { ObterColaboradorHandler } from "../../features/business/services/colaboradores";
import { ArquivoForm, Arquivos } from "../../presentation/app/pages";
import { API } from "../utils/constantes";
import criarDependencias from "./dependenciasFactories";

export const arquivoFormFactory = (token, limparSessao) => {
    const url = `${API.urlBase}${API.arquivo}/`;
    const { validacoes, httpServico } = criarDependencias(token);

    const criarArquivo = new CriarArquivoHandler(url, { httpServico }, validacoes);

    return {
        build: () => <ArquivoForm limparSessao={limparSessao} criarArquivo={criarArquivo} />
    };
};

export const obterArquivosFactory = (token, limparSessao) => {
    const url = `${API.urlBase}${API.arquivo}/`;
    const urlColaborador = `${API.urlBase}${API.colaborador}/`;
    const { httpServico, validacoes } = criarDependencias(token);

    const obterColaborador = new ObterColaboradorHandler(urlColaborador, { httpServico }, validacoes);
    const obterArquivos = new ObterArquivosHandler(url, { httpServico }, validacoes);
    const deletarArquivo = new DeletarArquivoHandler(url, { httpServico }, validacoes);

    return {
        build: () => <Arquivos deletarArquivo={deletarArquivo} limparSessao={limparSessao} obterArquivos={obterArquivos} obterColaborador={obterColaborador} />,
    };
};
