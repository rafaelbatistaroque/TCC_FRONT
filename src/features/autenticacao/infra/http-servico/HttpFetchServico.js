import Requisicao from "./RequisicaoFactories";
import Response from "./ResponseFactories";
import HttpServico from "../../business/contracts/HttpServico";

export default class HttpFetchServico extends HttpServico {
	#token;
	constructor(token) {
		super();

		this.#token = token;
	}

	async post(url, body) {
		const { options } = Requisicao.criarPost(body);

		const promise = await fetch(url, options);
		const resposta = await promise.json();

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

	get() {

	}
}