export default class Colaborador {
    id;
    primeiroNome;
    sobrenome;
    funcaoId;

    constructor(id, primeiroNome, sobrenome, funcaoId) {
        this.id = id;
        this.primeiroNome = primeiroNome;
        this.sobrenome = sobrenome;
        this.funcaoId = funcaoId;
    }

    static criar(id, numeroCPF, primeiroNome, sobrenome, funcaoId) {
        const funcaoIdNumber = Number.parseInt(funcaoId);

        return new Colaborador(id, numeroCPF, primeiroNome, sobrenome, funcaoIdNumber);
    }
}