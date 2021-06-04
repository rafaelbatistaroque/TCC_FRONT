import { TEXTOS } from "../../../../main/utils/constantes";
import CriarUsuario from "../../../domain/casos-de-uso/usuario/CriarUsuario";

export default class CriarUsuarioHandler extends CriarUsuario {
    #url;
    #httpServico;
    #validacoes;

    constructor(url, { httpServico }, validacoes) {
        super();

        this.#url = url;
        this.#httpServico = httpServico;
        this.#validacoes = validacoes;
    }

    async handler(usuario) {
        const validacao = this.validar(usuario);

        if (validacao.erro)
            return validacao;

        return await this.#httpServico.post(this.#url, usuario);
    }

    validar({ usuarioNome, usuarioSenha, usuarioPerfil }) {
        this.#validacoes
            .EhRequerido(usuarioNome, TEXTOS.PARAMETRO_INVALIDO)
            .EhRequerido(usuarioSenha, TEXTOS.PARAMETRO_INVALIDO)
            .EhRequerido(usuarioPerfil, TEXTOS.PARAMETRO_INVALIDO);

        const validacao = {
            erro: this.#validacoes.EhInvalido,
            data: this.#validacoes.Erros,
        };

        this.#validacoes.LimparErros();

        return validacao;
    }
}
