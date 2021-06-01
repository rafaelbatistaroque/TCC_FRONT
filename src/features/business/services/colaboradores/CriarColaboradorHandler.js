import { TEXTOS } from "../../../../main/utils/constantes";
import CriarColaborador from "../../../domain/casos-de-uso/colaboradores/CriarColaborador";

export default class CriarColaboradorHandler extends CriarColaborador {
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
        const { erro, data } = this.validar(colaborador);

        if (erro)
            return data;

        return await this.#httpServico.post(this.#url, colaborador);
    }

    validar({ numeroCPF, primeiroNome, sobrenome, funcaoId }) {

        this.#validacoes
            .EhRequerido(numeroCPF, TEXTOS.PARAMETRO_INVALIDO)
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