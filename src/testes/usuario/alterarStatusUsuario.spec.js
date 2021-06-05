import faker from "faker";
import { AlterarStatusUsuarioHandler } from "../../features/business/services/usuario";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Validacoes from "../../main/utils/Validacoes";
import UsuarioModel from "../../main/models/UsuarioModel";
import { TEXTOS } from "../../main/utils/constantes";

const criarSUT = (url = faker.internet.url()) => {
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const sut = new AlterarStatusUsuarioHandler(`${url}/`, { httpServico }, validacoes);

    return {
        url,
        httpServico,
        validacoes,
        sut
    };
};

describe('usuario.business.servico', () => {
    test.each`
    codigo          | retornoEsperado
    ${undefined}    | ${TEXTOS.PARAMETRO_INVALIDO}
    ${null}         | ${TEXTOS.PARAMETRO_INVALIDO}
    ${""}           | ${TEXTOS.PARAMETRO_INVALIDO}
    `('ao invocar handler | quando codigo inválido | deve retonar objeto com erro',
        async ({ codigo, retornoEsperado }) => {
            const { sut } = criarSUT();
            let usuario = UsuarioModel.alterarStatus(codigo);

            const { erro, data } = await sut.handler(usuario);

            expect(erro).toBe(true);
            expect(data[0]).toBe(retornoEsperado);
        });

    test('ao invocar handler | quando sem erro na validação | deve invocar httpServico put com url e body correto', async () => {
        const { sut, httpServico } = criarSUT();
        let usuario = UsuarioModel.alterarStatus("codigo_valido");
        jest.spyOn(httpServico, "put").mockResolvedValue({});

        await sut.handler(usuario);

        expect(httpServico.put).toBeCalledWith(sut.url, usuario);
    });

    test('ao invocar handler | quando invocado httpServico | deve retonar resposta sem erro', async () => {
        const { sut, httpServico } = criarSUT();
        const mock = jest.spyOn(httpServico, "put").mockReturnValue({ erro: false });
        jest.spyOn(sut, "validar").mockReturnValue({ erro: false });

        const { erro } = await sut.handler(expect.any(UsuarioModel));

        expect(erro).toBe(mock().erro);
        expect(httpServico.put).toHaveBeenCalledWith(expect.any(String), expect.any(UsuarioModel));
    });
});