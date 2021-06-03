import HttpFetchServico from "../../infra/http-servico/HttpFetchServico";
import Validacoes from "../../../main/utils/Validacoes";
import AutenticarUsuarioHandler from "../../business/services/autenticacao/AutenticarUsuarioHandler";
import faker from "faker";

const criarSUT = (url = faker.internet.url()) => {
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const sut = new AutenticarUsuarioHandler(url, { httpServico }, validacoes);

    return {
        url,
        httpServico,
        validacoes,
        sut
    };
};

describe('business.service.autenticacao', () => {
    test.each`
    usuario         | senha         | retornoEsperado
    ${""}	        | ${""}         | ${true}
    ${null}	        | ${null}	    | ${true}
    ${undefined}    | ${undefined}  | ${true}
    `("ao invocar handler | quando usuarioIdenticacao = $usuario ou usuarioSenha = $senha | deve retornar erro $retornoEsperado", async ({ usuario, senha, retornoEsperado }) => {
        const { sut } = criarSUT();
        const { erro } = await sut.handler(usuario, senha);

        expect(erro).toBe(retornoEsperado);
    });

    test('ao invocar handler | qualquer erro nas requisicões de httpServico | deve retornar erro true', async () => {
        const { sut, httpServico } = criarSUT();
        const mock = jest.spyOn(httpServico, "post").mockReturnValue({ erro: true });

        const { erro } = await sut.handler(expect.any(String), expect.any(String));

        expect(erro).toBe(mock().erro);
        expect(httpServico.post).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    });

    test('ao invocar handler | quando informado url em post de httpServico | garantir url correta', async () => {
        const { sut, httpServico, url } = criarSUT();
        const mock = jest.spyOn(httpServico, "post").mockResolvedValue();

        await sut.handler(expect.any(String), expect.any(String));

        expect(sut.url).toBe(url);
        expect(url).toBe(mock.mock.calls[0][0]);
        expect(httpServico.post).toBeCalledWith(sut.url, expect.any(Object));
    });

    test('ao invocar handler | quando retorno sem erro de httpServico | deve retornar erro false', async () => {
        const { sut, httpServico } = criarSUT();
        const mock = jest.spyOn(httpServico, "post").mockReturnValue({ erro: false });

        const { erro } = await sut.handler(expect.any(String), expect.any(String));

        expect(erro).toBe(mock().erro);
        expect(httpServico.post).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    });
});