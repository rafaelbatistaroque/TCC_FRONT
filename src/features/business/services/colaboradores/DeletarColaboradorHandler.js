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
        this.#validacoes.EhRequerido(colaboradorId, TEXTOS.NAO_DELETAR_COLABORADOR);

        if (this.#validacoes.EhInvalido) {
            const erros = this.#validacoes.Erros;
            this.#validacoes.LimparErros();

            return {
                erro: true,
                data: erros,
            };
        }

        return await this.#httpServico?.delete(`${this.#url}${colaboradorId}`);
    }
}