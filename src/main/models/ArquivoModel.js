export default class ArquivoModel {
    colaboradorId;
    referenciaMes;
    referenciaAno;
    tipoArquivo;
    anexo;
    observacoes;

    constructor(colaboradorId, referenciaMes, referenciaAno, tipoArquivo, anexo, observacoes) {
        this.colaboradorId = colaboradorId;
        this.referenciaMes = referenciaMes;
        this.referenciaAno = referenciaAno;
        this.tipoArquivo = tipoArquivo;
        this.anexo = anexo;
        this.observacoes = observacoes;
    }

    static criar(colaboradorId, referenciaMes, referenciaAno, tipoArquivo, anexo, observacoes) {
        const tipoArquivoNumber = Number.parseInt(tipoArquivo);
        const colaboradorIdAnoNumber = Number.parseInt(colaboradorId);

        return new ArquivoModel(colaboradorIdAnoNumber, referenciaMes, referenciaAno, tipoArquivoNumber, anexo, observacoes);
    }
}