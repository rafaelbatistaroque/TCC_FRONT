import Requisicao from "./RequisicaoFactories";
import HttpPostServico from "../../business/contracts/HttpPostServico";
import Response from "./ResponseFactories";

export default class HttpFetchServico extends HttpPostServico {
	async post(url, body) {
		const { options } = Requisicao.criarPost(body);

		const promise = await fetch(url, options);
		const resposta = await promise.json();
		console.log(resposta);
		const errosDeResponse = {
			401: Response.unauthorized(),
			400: Response.badRequest(resposta.erros),
			500: Response.erroInesperado(),
			200: Response.ok(resposta)
		}

		if(promise.status in errosDeResponse === false)
			return errosDeResponse[500];

		return errosDeResponse[promise.status];
	}
}
