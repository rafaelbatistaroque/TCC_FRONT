import { TEXTOS } from "../../../../main/utils/constantes";
import BusinessSuper from "../BusinessSuper";

export default class AlterarStatusUsuarioHandler extends BusinessSuper {
    url;
    #httpServico;
    #validacoes;

    constructor(url, { httpServico }, validacoes) {
        super();

        this.url = url;
        this.#httpServico = httpServico;
        this.#validacoes = validacoes;
    }

    async handler(usuario) {
        const validacao = this.validar(usuario);

        if (validacao.erro)
            return validacao;

        return await this.#httpServico?.put(this.url, usuario);
    }

    validar({ usuarioCodigo }) {
        this.#validacoes.EhRequerido(usuarioCodigo, TEXTOS.PARAMETRO_INVALIDO);

        const validacao = {
            erro: this.#validacoes.EhInvalido,
            data: this.#validacoes.Erros,
        };

        this.#validacoes.LimparErros();

        return validacao;
    }
}
