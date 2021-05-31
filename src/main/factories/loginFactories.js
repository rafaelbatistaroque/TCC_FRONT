import AutenticarUsuarioHandler from "../../features/business/services/autenticacao/AutenticarUsuarioHandler";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Login from "../../presentation/pages/Login";
import API from "../../utils/urlApi";
import Validacoes from "../../utils/Validacoes";

const loginFactory = () => {
    const url = `${API.urlBase}${API.altenticacao}`;
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const autenticacao = new AutenticarUsuarioHandler(
        url,
        { httpServico },
        validacoes
    );

    return {
        build: () => <Login autenticar={autenticacao} />,
    };
};

export default loginFactory;
