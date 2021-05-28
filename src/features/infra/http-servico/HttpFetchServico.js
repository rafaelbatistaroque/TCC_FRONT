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
		if (promise.status === 401)
			return Response.unauthorized();

		const response = Response.criar(promise, await promise.json());
		return response.obterResponse;
	}

	async get(url) {
		const { options } = Requisicao.criarGet(this.#token);

		const promise = await fetch(url, options);

		if (promise.status === 401)
			return Response.unauthorized();

		const response = Response.criar(promise, await promise.json());
		return response.obterResponse;
	}

	async delete(url, colaboradorId) {
		const { options } = Requisicao.criarDelete(this.#token);

		const promise = await fetch(url, options);

		if (promise.status === 401)
			return Response.unauthorized();

		const response = Response.criar(promise, await promise.json());
		return response.obterResponse;
	}


}