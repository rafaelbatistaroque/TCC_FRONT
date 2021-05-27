import ObterColaboradores from "../../domain/casos-de-uso/ObterColaboradores";

export default class ObterColaboradoresHandler extends ObterColaboradores {
  #url;
  #httpServico;

  constructor(url, httpServico) {
    super();

    this.#url = url;
    this.#httpServico = httpServico;
  }

  async handler() {
    const resposta = await this.#httpServico.get(this.#url);

    return resposta;
  }
}
