import faker from "faker";
import { AlterarColaboradorHandler } from "../../features/business/services/colaboradores";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Validacoes from "../../main/utils/Validacoes";
import ColaboradorModel from "../../main/models/ColaboradorModel";
import { TEXTOS } from "../../main/utils/constantes";

const criarSUT = (url = faker.internet.url()) => {
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const sut = new AlterarColaboradorHandler(`${url}/`, { httpServico }, validacoes);

    return {
        url,
        httpServico,
        validacoes,
        sut
    };
};

describe('colaborador.business.servico', () => {
    test.each`
    id              | nome          | sobrenome     | retornoEsperado
    ${undefined}    | ${"valido"}	| ${"valido"}   | ${TEXTOS.PARAMETRO_INVALIDO}
    ${null}         | ${"valido"}	| ${"valido"}   | ${TEXTOS.PARAMETRO_INVALIDO}
    ${""}           | ${"valido"}	| ${"valido"}   | ${TEXTOS.PARAMETRO_INVALIDO}
    ${"valido"}     | ${undefined}  | ${"valido"}   | ${TEXTOS.NOME_INVALIDO}
    ${"valido"}     | ${null}       | ${"valido"}   | ${TEXTOS.NOME_INVALIDO}
    ${"valido"}     | ${""}	        | ${"valido"}   | ${TEXTOS.NOME_INVALIDO}
    ${"valido"}     | ${"valido"}   | ${undefined}  | ${TEXTOS.SOBRENOME_INVALIDO}
    ${"valido"}     | ${"valido"}   | ${null}       | ${TEXTOS.SOBRENOME_INVALIDO}
    ${"valido"}     | ${"valido"}   | ${""}         | ${TEXTOS.SOBRENOME_INVALIDO}
    `('ao invocar handler | quando parametros inválido | deve retonar objeto com erro',
        async ({ id, nome, sobrenome, retornoEsperado }) => {

            const { sut } = criarSUT();
            let colaborador = ColaboradorModel.criar(id, null, nome, sobrenome, null);
            const { erro, data } = await sut.handler(colaborador);

            expect(erro).toBe(true);
            expect(data[0]).toBe(retornoEsperado);
        });

    test('ao invocar handler | quando sem erro na validação | deve invocar httpServico put com url e body correto', async () => {
        const { sut, httpServico } = criarSUT();
        let colaborador = ColaboradorModel.criar(0, "000.000.000-10", "nome_valido", "sobrenome_valido", 2);
        jest.spyOn(httpServico, "put").mockResolvedValue({});

        await sut.handler(colaborador);
        expect(httpServico.put).toBeCalledWith(sut.url, colaborador);
    });

    test('ao invocar handler | quando invocado httpServico | deve retonar resposta sem erro', async () => {
        const { sut, httpServico } = criarSUT();
        const mock = jest.spyOn(httpServico, "put").mockReturnValue({ erro: false });
        jest.spyOn(sut, "validar").mockReturnValue({ erro: false });

        const { erro } = await sut.handler(expect.any(ColaboradorModel));

        expect(erro).toBe(mock().erro);
        expect(httpServico.put).toHaveBeenCalledWith(expect.any(String), expect.any(ColaboradorModel));
    });
});