import BusinessSuper from "../BusinessSuper";

export default class ObterColaboradoresHandler extends BusinessSuper {
    url;
    #httpServico;

    constructor(url, { httpServico }) {
        super();

        this.url = url;
        this.#httpServico = httpServico;
    }

    async handler() {
        return await this.#httpServico?.get(this.url);
    }
}
