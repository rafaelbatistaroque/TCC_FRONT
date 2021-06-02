import CriarArquivo from "../../../domain/casos-de-uso/arquivo/CriarArquivo";


export default class CriarArquivoHandler extends CriarArquivo {
    #url;
    #httpServico;

    constructor(url, { httpServico }) {
        super();

        this.#url = url;
        this.#httpServico = httpServico;
    }

    async handler(arquivo) {

        const form = new FormData();

        Object.entries(arquivo).forEach(item => {
            form.append(item[0], item[1]);
        });

        return await this.#httpServico?.postForm(this.#url, form);
    }
}
