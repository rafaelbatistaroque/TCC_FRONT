import { ObterColaboradoresHandler } from "../../features/business/services/colaboradores";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Validacoes from "../../main/utils/Validacoes";
import faker from "faker";

const criarSUT = (url = faker.internet.url()) => {
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const sut = new ObterColaboradoresHandler(url, { httpServico }, validacoes);

    return {
        url,
        httpServico,
        validacoes,
        sut
    };
};

describe('colaborador.business.servico', () => {
    test('ao invocar handler | quando qualquer erro de httpServico | deve ser retornado para tela', async () => {
        const { sut, httpServico } = criarSUT();
        const mock = jest.spyOn(httpServico, "get").mockReturnValue({ erro: true, statusCode: 401 });
        const { erro, statusCode } = await sut.handler();

        expect(erro).toBe(mock().erro);
        expect(statusCode).toBe(mock().statusCode);
        expect(httpServico.get).toBeCalled();
    });

    test('ao invocar handler | quando informado url no get de httpServico | garantir url correta', async () => {
        const { sut, httpServico, url } = criarSUT();
        const mock = jest.spyOn(httpServico, "get").mockResolvedValue();

        await sut.handler();

        expect(sut.url).toBe(url);
        expect(url).toBe(mock.mock.calls[0][0]);
        expect(httpServico.get).toBeCalledWith(sut.url);
    });

    test('ao invocar handler | quando nenhum erro httpServico | garantir deve retornar erro false', async () => {
        const { sut, httpServico, url } = criarSUT();
        const mock = jest.spyOn(httpServico, "get").mockReturnValue({ erro: false });

        const { erro } = await sut.handler();

        expect(sut.url).toBe(url);
        expect(httpServico.get).toBeCalledWith(sut.url);
        expect(erro).toBe(mock().erro);
    });
});