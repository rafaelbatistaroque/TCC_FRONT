import { TEXTOS } from "../../../../main/utils/constantes";
import DeletarArquivo from "../../../domain/casos-de-uso/arquivo/DeletarArquivo";

export default class DeletarArquivoHandler extends DeletarArquivo {
    #url;
    #httpServico;
    #validacoes;

    constructor(url, { httpServico }, validacoes) {
        super();

        this.#url = url;
        this.#httpServico = httpServico;
        this.#validacoes = validacoes;
    }

    async handler(arquivoId) {

        const validacao = this.validar(arquivoId);

        if (validacao.erro)
            return validacao;

        return await this.#httpServico?.delete(`${this.#url}${arquivoId}`);
    }

    validar(colaboradorId) {
        this.#validacoes.EhRequerido(colaboradorId, TEXTOS.NAO_DELETAR_ARQUIVO);

        const validacao = {
            erro: this.#validacoes.EhInvalido,
            data: this.#validacoes.Erros,
        };

        this.#validacoes.LimparErros();

        return validacao;
    }
}