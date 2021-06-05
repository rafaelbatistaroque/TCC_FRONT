import faker from "faker";
import { CriarArquivoHandler } from "../../features/business/services/arquivo";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Validacoes from "../../main/utils/Validacoes";
import ArquivoModel from "../../main/models/ArquivoModel";
import { TEXTOS } from "../../main/utils/constantes";

const criarSUT = (url = faker.internet.url()) => {
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const sut = new CriarArquivoHandler(`${url}/`, { httpServico }, validacoes);

    return {
        url,
        httpServico,
        validacoes,
        sut
    };
};

describe('arquivo.business.servico', () => {
    test.each`
        referenciaMes   | referenciaAno | anexo         | retornoEsperado
        ${undefined}	| ${"2021"}     | ${"valido"}   | ${TEXTOS.MES_INVALIDO}
        ${null}	        | ${"2021"}     | ${"valido"}   | ${TEXTOS.MES_INVALIDO}
        ${""}	        | ${"2021"}     | ${"valido"}   | ${TEXTOS.MES_INVALIDO}
        ${"01"}	        | ${undefined}  | ${"valido"}   | ${TEXTOS.ANO_INVALIDO}
        ${"01"}	        | ${null}       | ${"valido"}   | ${TEXTOS.ANO_INVALIDO}
        ${"01"}	        | ${""}         | ${"valido"}   | ${TEXTOS.ANO_INVALIDO}
        ${"01"}	        | ${"2021"}     | ${undefined}  | ${TEXTOS.ANEXO_INVALIDO}
        ${"01"}	        | ${"2021"}     | ${null}       | ${TEXTOS.ANEXO_INVALIDO}
        ${"01"}	        | ${"2021"}     | ${""}         | ${TEXTOS.ANEXO_INVALIDO}
        `('ao invocar handler | quando parametros inválido | deve retonar objeto com erro',
        async ({ referenciaMes, referenciaAno, anexo, retornoEsperado }) => {

            const { sut } = criarSUT();
            let arquivo = ArquivoModel.criar(0, referenciaMes, referenciaAno, 1, anexo);
            const { erro, data } = await sut.handler(arquivo);

            expect(erro).toBe(true);
            expect(data[0]).toBe(retornoEsperado);
        });

    test('ao invocar handler | quando sem erro na validação | deve invocar httpServico post com url e form correto', async () => {
        const { sut, httpServico } = criarSUT();
        let arquivo = ArquivoModel.criar(0, "12", "2021", 1, "anexo_valido");
        jest.spyOn(httpServico, "postForm").mockResolvedValue({});

        const form = new FormData();

        Object.entries(arquivo).forEach(item => {
            form.append(item[0], item[1]);
        });

        await sut.handler(arquivo);

        expect(httpServico.postForm).toBeCalledWith(sut.url, form);
    });

    test('ao invocar handler | quando invocado httpServico | deve retonar resposta sem erro', async () => {
        const { sut, httpServico } = criarSUT();
        const mock = jest.spyOn(httpServico, "postForm").mockReturnValue({ erro: false });
        let arquivo = ArquivoModel.criar(0, "12", "2021", 1, "anexo_valido");

        const { erro } = await sut.handler(arquivo);

        expect(erro).toBe(mock().erro);
        expect(httpServico.postForm).toHaveBeenCalledWith(expect.any(String), expect.any(FormData));
    });
});