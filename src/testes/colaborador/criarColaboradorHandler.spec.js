import faker from "faker";
import { CriarColaboradorHandler } from "../../features/business/services/colaboradores";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Validacoes from "../../main/utils/Validacoes";
import ColaboradorModel from "../../main/models/ColaboradorModel";
import { TEXTOS } from "../../main/utils/constantes";

const criarSUT = (url = faker.internet.url()) => {
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const sut = new CriarColaboradorHandler(`${url}/`, { httpServico }, validacoes);

    return {
        url,
        httpServico,
        validacoes,
        sut
    };
};

describe('colaborador.business.servico', () => {
    test.each`
        nome            | sobrenome     | cpf           | retornoEsperado
        ${undefined}	| ${"valido"}   | ${"valido"}   | ${TEXTOS.NOME_INVALIDO}
        ${null}	        | ${"valido"}   | ${"valido"}   | ${TEXTOS.NOME_INVALIDO}
        ${""}	        | ${"valido"}   | ${"valido"}   | ${TEXTOS.NOME_INVALIDO}
        ${"valido"}	    | ${undefined}  | ${"valido"}   | ${TEXTOS.SOBRENOME_INVALIDO}
        ${"valido"}	    | ${null}       | ${"valido"}   | ${TEXTOS.SOBRENOME_INVALIDO}
        ${"valido"}     | ${""}	        | ${"valido"}   | ${TEXTOS.SOBRENOME_INVALIDO}
        ${"valido"}	    | ${"valido"}   | ${undefined}  | ${TEXTOS.CPF_INVALIDO}
        ${"valido"}	    | ${"valido"}   | ${null}       | ${TEXTOS.CPF_INVALIDO}
        ${"valido"}     | ${"valido"}   | ${""}	        | ${TEXTOS.CPF_INVALIDO}
        `('ao invocar handler | quando parametros inválido | deve retonar objeto com erro',
        async ({ nome, sobrenome, cpf, retornoEsperado }) => {

            const { sut } = criarSUT();
            let colaborador = ColaboradorModel.criar(0, cpf, nome, sobrenome, null);
            const { erro, data } = await sut.handler(colaborador);

            expect(erro).toBe(true);
            expect(data[0]).toBe(retornoEsperado);
        });

    test('ao invocar handler | quando sem erro na validação | deve invocar httpServico post com url e body correto', async () => {
        const { sut, httpServico } = criarSUT();
        let colaborador = ColaboradorModel.criar(0, "000.000.000-10", "nome_valido", "sobrenome_valido", 2);
        jest.spyOn(httpServico, "post").mockResolvedValue({});

        await sut.handler(colaborador);
        expect(httpServico.post).toBeCalledWith(sut.url, colaborador);
    });

    test('ao invocar handler | quando invocado httpServico | deve retonar resposta sem erro', async () => {
        const { sut, httpServico } = criarSUT();
        const mock = jest.spyOn(httpServico, "post").mockReturnValue({ erro: false });
        jest.spyOn(sut, "validar").mockReturnValue({ erro: false });

        const { erro } = await sut.handler(expect.any(ColaboradorModel));

        expect(erro).toBe(mock().erro);
        expect(httpServico.post).toHaveBeenCalledWith(expect.any(String), expect.any(ColaboradorModel));
    });
});