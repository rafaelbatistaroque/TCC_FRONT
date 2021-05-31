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
        const { options } = Requisicao.criarPost(body, this.#token);

        const promise = await fetch(url, options);

        const json = await promise.json().catch(() => null);
        let { obterResponse } = Response.criar(promise, json);
        return obterResponse;
    }

    async get(url) {
        const { options } = Requisicao.criarGet(this.#token);

        const promise = await fetch(url, options);

        const json = await promise.json().catch(() => null);
        let { obterResponse } = Response.criar(promise, json);
        return obterResponse;
    }

    async put(url, body) {
        const { options } = Requisicao.criarPut(body, this.#token);

        const promise = await fetch(url, options);

        const json = await promise.json().catch(() => null);
        let { obterResponse } = Response.criar(promise, json);
        return obterResponse;
    }

    async delete(url) {
        const { options } = Requisicao.criarDelete(this.#token);

        const promise = await fetch(url, options);

        const json = await promise.json().catch(() => null);
        let { obterResponse } = Response.criar(promise, json);
        return obterResponse;
    }


}