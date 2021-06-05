import { TEXTOS } from "../../../../main/utils/constantes";
import BusinessSuper from "../BusinessSuper";

export default class CriarUsuarioHandler extends BusinessSuper {
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

        return await this.#httpServico.post(this.url, usuario);
    }

    validar({ usuarioNome, usuarioSenha }) {
        this.#validacoes
            .EhRequerido(usuarioNome, TEXTOS.NOME_INVALIDO)
            .EhRequerido(usuarioSenha, TEXTOS.SENHA_INVALIDO);

        const validacao = {
            erro: this.#validacoes.EhInvalido,
            data: this.#validacoes.Erros,
        };

        this.#validacoes.LimparErros();

        return validacao;
    }
}
