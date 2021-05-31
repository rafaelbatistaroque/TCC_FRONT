import ObterArquivos from "../../../domain/casos-de-uso/arquivo/ObterArquivos";


export default class ObterArquivosHandler extends ObterArquivos {
    #url;
    #httpServico;

    constructor(url, { httpServico }) {
        super();

        this.#url = url;
        this.#httpServico = httpServico;
    }

    async handler(colaboradorId) {
        return await this.#httpServico?.get(`${this.#url}${colaboradorId}`);
    }
}
