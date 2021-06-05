import { TEXTOS } from "../../../../main/utils/constantes";
import BusinessSuper from "../BusinessSuper";

export default class CriarColaboradorHandler extends BusinessSuper {
    url;
    #httpServico;
    #validacoes;

    constructor(url, { httpServico }, validacoes) {
        super();

        this.url = url;
        this.#httpServico = httpServico;
        this.#validacoes = validacoes;
    }

    async handler(colaborador) {
        const validacao = this.validar(colaborador);

        if (validacao.erro)
            return validacao;

        return await this.#httpServico.post(this.url, colaborador);
    }

    validar({ numeroCPF, primeiroNome, sobrenome }) {

        this.#validacoes
            .EhRequerido(numeroCPF, TEXTOS.CPF_INVALIDO)
            .EhRequerido(primeiroNome, TEXTOS.NOME_INVALIDO)
            .EhRequerido(sobrenome, TEXTOS.SOBRENOME_INVALIDO);

        const validacao = {
            erro: this.#validacoes.EhInvalido,
            data: this.#validacoes.Erros,
        };

        this.#validacoes.LimparErros();

        return validacao;
    }
}