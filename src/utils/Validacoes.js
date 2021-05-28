export default class Validacoes {
  #erros;
  #TIPOS = {
    boolean: "boolean",
  };

  constructor() {
    this.#erros = [];
  }

  EhRequerido(valor, mensagem) {
    if (valor === null || valor === undefined || valor.length <= 0) this.#erros.push({ id: gerarId(), mensagem });

    return this;
  }

  EhMenorQue(valor, min, mensagem) {
    if (!valor || valor.length < min) this.#erros.push({ id: gerarId(), mensagem });

    return this;
  }

  EhMaiorQue(valor, max, mensagem) {
    if (!valor || valor.length > max) this.#erros.push({ id: gerarId(), mensagem });

    return this;
  }

  DeveSerIgual(valor, len, mensagem) {
    if (valor.length !== len) this.#erros.push({ id: gerarId(), mensagem });

    return this;
  }

  EhMail(valor, mensagem) {
    let reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(valor)) this.#erros.push({ id: gerarId(), mensagem });

    return this;
  }

  AdicionarErro(mensagem) {
    this.#erros.push({ id: gerarId(), mensagem });

    return this;
  }

  NaoEhNumero(valor, mensagem) {
    if (!Number.isInteger(valor)) this.#erros.push({ id: gerarId(), mensagem });

    return this;
  }

  EhTipoData(data, mensagem) {
    if (Number.isNaN(Date.parse(data))) this.#erros.push({ id: gerarId(), mensagem });

    return this;
  }

  EhTipoBoolean(data, mensagem) {
    if (typeof data !== this.#TIPOS.boolean) this.#erros.push({ id: gerarId(), mensagem });

    return this;
  }

  EhDataPassado(data, mensagem) {
    if (new Date(data) < new Date(new Date().setHours(-4, 0, 0, 0))) this.#erros.push({ id: gerarId(), mensagem });

    return this;
  }

  get Erros() {
    return this.#erros.map(x => x.mensagem);
  }

  LimparErros() {
    this.#erros = [];

    return this;
  }

  get EhValido() {
    return this.#erros.length === 0;
  }

  get EhInvalido() {
    return this.#erros.length > 0;
  }
}

const gerarId = () => Math.floor(Math.random() * 1000) + 1;