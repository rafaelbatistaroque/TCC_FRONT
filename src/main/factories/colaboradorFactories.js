import AlterarColaboradorHandler from "../../features/business/services/colaboradores/AlterarColaboradorHandler";
import { DeletarColaboradorHandler } from "../../features/business/services/colaboradores/DeletarColaboradorHandler";
import ObterColaboradoresHandler from "../../features/business/services/colaboradores/ObterColaboradoresHandler";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import ColaboradorAlterar from "../../presentation/pages/ColaboradorAlterar";
import Colaboradores from "../../presentation/pages/Colaboradores";
import API from "../../utils/urlApi";
import Validacoes from "../../utils/Validacoes";

const criarDependencias = (token) => {
    const validacoes = new Validacoes();
    const httpServico = new HttpFetchServico(token);
    return {
        validacoes,
        httpServico,
    };
};

const deletarColaboradorFactory = (token) => {
    const url = API.deletarColaborador;
    const { validacoes, httpServico } = criarDependencias(token);
    const deletarColaboradores = new DeletarColaboradorHandler(url, { httpServico }, validacoes);
    return {
        build: () => deletarColaboradores,
    };
};

export const colaboradorAlterarFactory = (token) => {
    const url = API.editarColaborador;
    const { validacoes, httpServico } = criarDependencias(token);
    const alterarColaborador = new AlterarColaboradorHandler(url, { httpServico }, validacoes);

    return {
        build: () => <ColaboradorAlterar alterarColaborador={alterarColaborador} />
    };
};

export const obterColaboradorFactory = (token) => {
    const url = API.obterColaboradores;
    const { httpServico } = criarDependencias(token);
    const obterColaboradores = new ObterColaboradoresHandler(url, { httpServico });
    return {
        build: () => <Colaboradores
            obterColaboradores={obterColaboradores}
            deletarColaborador={deletarColaboradorFactory(token).build()} />,
    };
};
