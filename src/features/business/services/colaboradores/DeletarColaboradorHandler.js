import { TEXTOS } from "../../../../main/utils/constantes";
import DeletarColaborador from "../../../domain/casos-de-uso/colaboradores/DeletarColaborador";

export default class DeletarColaboradorHandler extends DeletarColaborador {
    #url;
    #httpServico;
    #validacoes;

    constructor(url, { httpServico }, validacoes) {
        super();

        this.#url = url;
        this.#httpServico = httpServico;
        this.#validacoes = validacoes;
    }

    async handler(colaboradorId) {
        const validacao = this.validar(colaboradorId);

        if (validacao.erro)
            return validacao;

        return await this.#httpServico?.delete(`${this.#url}${colaboradorId}`);
    }

    validar(colaboradorId) {
        this.#validacoes.EhRequerido(colaboradorId, TEXTOS.NAO_DELETAR_COLABORADOR);

        const validacao = {
            erro: this.#validacoes.EhInvalido,
            data: this.#validacoes.Erros,
        };

        this.#validacoes.LimparErros();

        return validacao;
    }
}