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
    if (resposta.statusCode === 401)
      return {
        naoAutorizado: true,
        mensagem: "Requisição não autorizada!"
      };

    if (resposta.erro === false)
      return resposta.data.colaboradores;

    return resposta;
  }
}
