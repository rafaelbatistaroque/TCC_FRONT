import { TEXTOS } from "../../../../main/utils/constantes";
import AlterarColaborador from "../../../domain/casos-de-uso/colaboradores/AlterarColaborador";

export default class AlterarColaboradorHandler extends AlterarColaborador {
    #url;
    #httpServico;
    #validacoes;

    constructor(url, { httpServico }, validacoes) {
        super();

        this.#url = url;
        this.#httpServico = httpServico;
        this.#validacoes = validacoes;
    }

    async handler(colaborador) {
        const validacao = this.validar(colaborador);

        if (validacao.erro)
            return validacao;

        return await this.#httpServico.put(this.#url, colaborador);
    }

    validar({ id, primeiroNome, sobrenome, funcaoId }) {

        this.#validacoes
            .EhRequerido(id, TEXTOS.PARAMETRO_INVALIDO)
            .EhRequerido(primeiroNome, TEXTOS.PARAMETRO_INVALIDO)
            .EhRequerido(sobrenome, TEXTOS.PARAMETRO_INVALIDO)
            .EhRequerido(funcaoId, TEXTOS.PARAMETRO_INVALIDO);

        const validacao = {
            erro: this.#validacoes.EhInvalido,
            data: this.#validacoes.Erros,
        };

        this.#validacoes.LimparErros();

        return validacao;
    }
}