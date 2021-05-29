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
}