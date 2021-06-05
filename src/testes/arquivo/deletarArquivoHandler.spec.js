import faker from "faker";
import { DeletarArquivoHandler } from "../../features/business/services/arquivo/";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import { TEXTOS } from "../../main/utils/constantes";
import Validacoes from "../../main/utils/Validacoes";

const criarSUT = (url = faker.internet.url()) => {
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const sut = new DeletarArquivoHandler(`${url}/`, { httpServico }, validacoes);

    return {
        url,
        httpServico,
        validacoes,
        sut
    };
};

describe('arquivo.business.servico', () => {
    test.each`
        colaboradorId   | retornoEsperado
        ${undefined}    | ${TEXTOS.NAO_DELETAR_ARQUIVO}
        ${""}	        | ${TEXTOS.NAO_DELETAR_ARQUIVO}
        `('ao invocar handler | quando erro na validacao | deve retonar objecto com erro',
        async ({ colaboradorId, retornoEsperado }) => {
            const { sut } = criarSUT();

            const { erro, data } = await sut.handler(colaboradorId);

            expect(erro).toBe(true);
            expect(data[0]).toBe(retornoEsperado);
        });

    test('ao invocar handler | quando sem erro na validação | deve invocar httpServico delete com url válida', async () => {
        const { sut, httpServico } = criarSUT();
        const colaboradorId = "qualquer_numero";
        jest.spyOn(httpServico, "delete").mockResolvedValue();

        await sut.handler(colaboradorId);

        expect(httpServico.delete).toBeCalledWith(`${sut.url}${colaboradorId}`);
    });

    test('ao invocar handler | quando invocado httpServico | deve retonar resposta de requisição', async () => {
        const { sut, httpServico } = criarSUT();
        jest.spyOn(httpServico, "delete").mockResolvedValue({ erro: false });

        const { erro } = await sut.handler(expect.any(Number));
        expect(erro).toBe(false);
    });
});