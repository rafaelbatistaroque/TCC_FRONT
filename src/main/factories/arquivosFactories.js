import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import ObterArquivosHandler from "../../features/business/services/arquivo/ObterArquivosHandler";
import API from "../utils/urlApi";
import Validacoes from "../utils/Validacoes";
import { Arquivos } from "../../presentation/pages";

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

// export const colaboradorFormFactory = (token) => {
//     const url = `${API.urlBase}${API.colaborador}/`;
//     const { validacoes, httpServico } = criarDependencias(token);

//     const alterarColaborador = new AlterarColaboradorHandler(url, { httpServico }, validacoes);
//     const obterColaborador = new ObterColaboradorhandler(url, { httpServico }, validacoes);
//     const criarColaborador = new CriarColaboradorHandler(url, { httpServico }, validacoes);
//     const colaboradorEntidade = new Colaborador();

//     return {
//         build: () => <ColaboradorForm
//             alterarColaborador={alterarColaborador}
//             obterColaborador={obterColaborador}
//             criarColaborador={criarColaborador}
//             colaboradorEntidade={colaboradorEntidade} />
//     };
// };

export const obterArquivosFactory = (token) => {
    const url = `${API.urlBase}${API.arquivo}/`;
    const { httpServico } = criarDependencias(token);

    const obterArquivos = new ObterArquivosHandler(url, { httpServico });

    return {
        build: () => <Arquivos obterArquivos={obterArquivos} />,
    };
};
