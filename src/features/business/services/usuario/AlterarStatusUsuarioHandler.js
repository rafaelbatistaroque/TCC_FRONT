import ObterUsuarios from "../../../domain/casos-de-uso/usuario/ObterUsuarios";

export default class AlterarStatusUsuarioHandler extends ObterUsuarios {
    url;
    #httpServico;

    constructor(url, { httpServico }) {
        super();

        this.url = url;
        this.#httpServico = httpServico;
    }

    async handler(usuario) {
        return await this.#httpServico?.put(this.url, usuario);
    }
}
