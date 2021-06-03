import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Validacoes from "../utils/Validacoes";

const criarDependencias = (token) => {
    const validacoes = new Validacoes();
    const httpServico = new HttpFetchServico(token);
    return {
        validacoes,
        httpServico,
    };
};

export default criarDependencias;