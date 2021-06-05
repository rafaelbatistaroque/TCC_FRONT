import faker from "faker";
import { DeletarColaboradorHandler } from "../../features/business/services/colaboradores";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Validacoes from "../../main/utils/Validacoes";

const criarSUT = (url = faker.internet.url()) => {
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const sut = new DeletarColaboradorHandler(`${url}/`, { httpServico }, validacoes);

    return {
        url,
        httpServico,
        validacoes,
        sut
    };
};

describe('colaborador.business.servico', () => {
    test('ao invocar handler | quando erro na validacao | deve retonar objecto com erro', async () => {
        const { sut } = criarSUT();
        const mockValidar = jest.spyOn(sut, "validar").mockReturnValue({ erro: true });

        const { erro } = await sut.handler(expect.any(String));

        expect(erro).toBe(mockValidar().erro);
        expect(sut.validar).toHaveBeenCalledWith(expect.any(String));
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

        expect(erro).toEqual(false);
    });
});