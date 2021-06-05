import { TEXTOS } from "../../../../main/utils/constantes";
import BusinessSuper from "../BusinessSuper";

export default class AutenticarUsuarioHandler extends BusinessSuper {
    url;
    #httpServico;
    #validacoes;

    constructor(url, { httpServico }, validacoes) {
        super();

        this.url = url;
        this.#httpServico = httpServico;
        this.#validacoes = validacoes;
    }

    async handler(usuarioIdentificacao, usuarioSenha) {

        const validacao = this.validar({ usuarioIdentificacao, usuarioSenha });

        if (validacao.erro)
            return validacao;

        return await this.#httpServico?.post(this.url, { usuarioIdentificacao, usuarioSenha });
    }

    validar({ usuarioIdentificacao, usuarioSenha }) {

        this.#validacoes
            .EhRequerido(usuarioIdentificacao, TEXTOS.USUARIO_NULO_VAZIO)
            .EhRequerido(usuarioSenha, TEXTOS.SENHA_NULA_VAZIA);

        const validacao = {
            erro: this.#validacoes.EhInvalido,
            data: this.#validacoes.Erros,
        };

        this.#validacoes.LimparErros();

        return validacao;
    }
}
