import ObterUsuarios from "../../../domain/casos-de-uso/usuario/ObterUsuarios";

export default class ObterUsuariosHandler extends ObterUsuarios {
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
