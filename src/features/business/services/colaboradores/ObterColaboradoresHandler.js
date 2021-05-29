import ObterColaboradores from "../../../domain/casos-de-uso/colaboradores/ObterColaboradores";

export default class ObterColaboradoresHandler extends ObterColaboradores {
    #url;
    #httpServico;

    constructor(url, { httpServico }) {
        super();

        this.#url = url;
        this.#httpServico = httpServico;
    }

    async handler() {
        return await this.#httpServico?.get(this.#url);
    }
}
