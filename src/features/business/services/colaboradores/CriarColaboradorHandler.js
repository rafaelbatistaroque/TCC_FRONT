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
}