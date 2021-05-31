export default class Colaborador {
    id;
    primeiroNome;
    sobrenome;
    numeroCPF;
    funcaoId;

    constructor(id, numeroCPF, primeiroNome, sobrenome, funcaoId) {
        this.id = id;
        this.primeiroNome = primeiroNome;
        this.sobrenome = sobrenome;
        this.numeroCPF = numeroCPF;
        this.funcaoId = funcaoId;
    }

    criar(id, numeroCPF, primeiroNome, sobrenome, funcaoId) {
        const funcaoIdNumber = Number.parseInt(funcaoId);

        return new Colaborador(id, numeroCPF, primeiroNome, sobrenome, funcaoIdNumber);
    }
}