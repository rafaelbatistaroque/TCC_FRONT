import AutenticarUsuarioHandler from "../../features/autenticacao/business/services/AutenticarUsuarioHandler";
import HttpFetchServico from "../../features/autenticacao/infra/http-servico/HttpFetchServico";
import Login from "../../presentation/pages/Login";
import API from "../../utils/urlApi";
import Validacoes from "../Validacoes";

const loginFactory = () => {
	const url = API.autenticacao;
	const httpPostServico = new HttpFetchServico();
	const validacoes = new Validacoes();
	const autenticacao = new AutenticarUsuarioHandler(url, httpPostServico, validacoes);

	return {
		build: () => <Login autenticar={autenticacao} />,
	};
};

export default loginFactory;
