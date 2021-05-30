import { TEXTOS } from "../../../../utils/constantes";
import AlterarColaborador from "../../../domain/casos-de-uso/colaboradores/AlterarColaborador";
import Colaborador from "../../../domain/entidades/Colaborador";

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

    async handler(id, primeiroNome, sobrenome, perfilId) {
        const colaborador = Colaborador.criar(id, primeiroNome, sobrenome, Number.parseInt(perfilId));

        const { erro, data } = this.validar(colaborador);

        if (erro)
            return data;

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