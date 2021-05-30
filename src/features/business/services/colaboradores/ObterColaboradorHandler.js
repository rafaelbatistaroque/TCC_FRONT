import { TEXTOS } from "../../../../utils/constantes";
import ObterColaborador from "../../../domain/casos-de-uso/colaboradores/ObterColaborador";

export default class ObterColaboradorhandler extends ObterColaborador {
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

        const { erro, data } = this.validar(colaboradorId);

        if (erro)
            return data;

        return await this.#httpServico.get(`${this.#url}${colaboradorId}`);
    }

    validar(colaboradorId) {
        this.#validacoes.EhRequerido(colaboradorId, TEXTOS.PARAMETRO_INVALIDO);

        const validacao = {
            erro: this.#validacoes.EhInvalido,
            data: this.#validacoes.Erros,
        };

        this.#validacoes.LimparErros();

        return validacao;
    }
}