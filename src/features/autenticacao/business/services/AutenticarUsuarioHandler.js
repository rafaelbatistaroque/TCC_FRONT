import TEXTOS from "../../../../utils/textosInformativos";
import AutenticarUsuario from "../../domain/casos-de-uso/AutenticarUsuario";

export default class AutenticarUsuarioHandler extends AutenticarUsuario {
	#url;
	#httpPostServico;
	#validacoes;

	constructor(url, httpPostServico, validacoes) {
		super();

		this.#url = url;
		this.#httpPostServico = httpPostServico;
		this.#validacoes = validacoes;
	}

	async handler(usuarioIdentificacao, usuarioSenha) {
		this.#validacoes
			.EhRequerido(usuarioIdentificacao, TEXTOS.USUARIO_NULO_VAZIO)
			.EhRequerido(usuarioSenha, TEXTOS.SENHA_NULA_VAZIA);

		if (this.#validacoes.EhInvalido) {
			const erros = this.#validacoes.Erros;
			this.#validacoes.LimparErros();

			return {
				erro: true,
				data: erros,
			};
		}

		const resposta = await this.#httpPostServico.post(this.#url, { usuarioIdentificacao, usuarioSenha });

		return resposta;
	}
}
