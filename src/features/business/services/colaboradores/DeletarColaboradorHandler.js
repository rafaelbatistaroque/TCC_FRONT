import TEXTOS from "../../../../utils/textosInformativos";
import DeletarColaborador from "../../../domain/casos-de-uso/colaboradores/DeletarColaborador";

export class DeletarColaboradorHandler extends DeletarColaborador {
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
        console.log("handler id", colaboradorId);
        const resposta = await this.#httpServico?.delete(this.#url, colaboradorId);

        if (resposta.statusCode === 401)
            return {
                naoAutorizado: true,
                mensagem: "Requisição não autorizada!"
            };

        if (resposta.erro === false)
            return resposta.data;

        return resposta;
    }
}