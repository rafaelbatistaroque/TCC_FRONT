import { ObterColaboradorHandler } from "../../features/business/services/colaboradores";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Validacoes from "../../main/utils/Validacoes";
import faker from "faker";
import { TEXTOS } from "../../main/utils/constantes";

const criarSUT = (url = faker.internet.url()) => {
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const sut = new ObterColaboradorHandler(`${url}/`, { httpServico }, validacoes);

    return {
        url,
        httpServico,
        validacoes,
        sut
    };
};

describe('colaborador.business.servico', () => {
    test.each`
        colaboradorId   | retornoEsperado
        ${undefined}    | ${TEXTOS.PARAMETRO_INVALIDO}
        ${""}	        | ${TEXTOS.PARAMETRO_INVALIDO}
        `('ao invocar handler | quando erro na validacao | deve retonar objecto com erro',
        async ({ colaboradorId, retornoEsperado }) => {
            const { sut } = criarSUT();

            const { erro, data } = await sut.handler(colaboradorId);

            expect(erro).toBe(true);
            expect(data[0]).toBe(retornoEsperado);
        });

    test('ao invocar handler | quando sem erro na validação | deve invocar httpServico post com url válida', async () => {
        const { sut, httpServico } = criarSUT();
        const colaboradorId = "qualquer_numero";
        jest.spyOn(httpServico, "get").mockResolvedValue();

        await sut.handler(colaboradorId);

        expect(httpServico.get).toBeCalledWith(`${sut.url}${colaboradorId}`);
    });

    test('ao invocar handler | quando invocado httpServico | deve retonar resposta de requisição', async () => {
        const { sut, httpServico } = criarSUT();
        const mock = jest.spyOn(httpServico, "get").mockResolvedValue({});

        const resposta = await sut.handler(expect.anything());

        expect(resposta).toEqual(await mock(expect.anything()));
        expect(httpServico.get).toBeCalled();
    });
});