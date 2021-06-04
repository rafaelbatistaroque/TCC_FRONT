import { TEXTOS } from "../../../../main/utils/constantes";
import CriarArquivo from "../../../domain/casos-de-uso/arquivo/CriarArquivo";


export default class CriarArquivoHandler extends CriarArquivo {
    #url;
    #httpServico;
    #validacoes;

    constructor(url, { httpServico }, validacoes) {
        super();

        this.#url = url;
        this.#httpServico = httpServico;
        this.#validacoes = validacoes;
    }

    async handler(arquivo) {
        const validacao = this.validar(arquivo);

        if (validacao.erro)
            return validacao;

        const form = new FormData();

        Object.entries(arquivo).forEach(item => {
            form.append(item[0], item[1]);
        });

        return await this.#httpServico?.postForm(this.#url, form);
    }

    validar({ referenciaMes, referenciaAno, anexo }) {
        this.#validacoes
            .DeveSerMes(referenciaMes, TEXTOS.MES_INVALIDO)
            .DeveSerAno(referenciaAno, TEXTOS.ANO_INVALIDO)
            .EhRequerido(anexo, TEXTOS.ANEXO_INVALIDO);

        const validacao = {
            erro: this.#validacoes.EhInvalido,
            data: this.#validacoes.Erros,
        };

        this.#validacoes.LimparErros();

        return validacao;
    }
}
