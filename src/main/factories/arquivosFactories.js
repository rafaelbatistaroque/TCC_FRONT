import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import ObterArquivosHandler from "../../features/business/services/arquivo/ObterArquivosHandler";
import API from "../../utils/urlApi";
import Validacoes from "../../utils/Validacoes";
import Arquivos from "../../presentation/pages/Arquivos";

const criarDependencias = (token) => {
    const validacoes = new Validacoes();
    const httpServico = new HttpFetchServico(token);
    return {
        validacoes,
        httpServico,
    };
};

export const obterArquivosFactory = (token) => {
    const url = `${API.urlBase}${API.arquivo}/`;
    const { httpServico } = criarDependencias(token);

    const obterArquivos = new ObterArquivosHandler(url, { httpServico });

    return {
        build: () => <Arquivos obterArquivos={obterArquivos} />,
    };
};
