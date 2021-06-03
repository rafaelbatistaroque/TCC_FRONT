import { TEXTOS } from "../../../../main/utils/constantes";
import AutenticarUsuario from "../../../domain/casos-de-uso/autenticacao/AutenticarUsuario";

export default class AutenticarUsuarioHandler extends AutenticarUsuario {
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

        const resposta = await this.#httpServico?.post(this.url, { usuarioIdentificacao, usuarioSenha });

        return resposta;
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
