import faker from "faker";
import { CriarUsuarioHandler } from "../../features/business/services/usuario";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Validacoes from "../../main/utils/Validacoes";
import UsuarioModel from "../../main/models/UsuarioModel";
import { TEXTOS } from "../../main/utils/constantes";

const criarSUT = (url = faker.internet.url()) => {
    const httpServico = new HttpFetchServico();
    const validacoes = new Validacoes();
    const sut = new CriarUsuarioHandler(`${url}/`, { httpServico }, validacoes);

    return {
        url,
        httpServico,
        validacoes,
        sut
    };
};

describe('usuario.business.servico', () => {
    test.each`
        usuarioNome     | usuarioSenha    | retornoEsperado
        ${undefined}	| ${"valido"}  | ${TEXTOS.NOME_INVALIDO}
        ${null}	        | ${"valido"}  | ${TEXTOS.NOME_INVALIDO}
        ${""}	        | ${"valido"}  | ${TEXTOS.NOME_INVALIDO}
        ${"valido"}	    | ${undefined} | ${TEXTOS.SENHA_INVALIDO}
        ${"valido"}	    | ${null}      | ${TEXTOS.SENHA_INVALIDO}
        ${"valido"}     | ${""}	       | ${TEXTOS.SENHA_INVALIDO}
        `('ao invocar handler | quando parametros inválidos | deve retonar objeto com erro',
        async ({ usuarioNome, usuarioSenha, retornoEsperado }) => {

            const { sut } = criarSUT();
            let usuario = UsuarioModel.criar(usuarioNome, usuarioSenha, 1);
            const { erro, data } = await sut.handler(usuario);

            expect(erro).toBe(true);
            expect(data[0]).toBe(retornoEsperado);
        });

    test('ao invocar handler | quando sem erro na validação | deve invocar httpServico post com url e body correto', async () => {
        const { sut, httpServico } = criarSUT();
        let usuario = UsuarioModel.criar("nome_valido", "senha_valida", 1);
        jest.spyOn(httpServico, "post").mockResolvedValue({});

        await sut.handler(usuario);

        expect(httpServico.post).toBeCalledWith(sut.url, usuario);
    });

    test('ao invocar handler | quando invocado httpServico | deve retonar resposta sem erro', async () => {
        const { sut, httpServico } = criarSUT();
        const mock = jest.spyOn(httpServico, "post").mockReturnValue({ erro: false });
        jest.spyOn(sut, "validar").mockReturnValue({ erro: false });

        const { erro } = await sut.handler(expect.any(UsuarioModel));

        expect(erro).toBe(mock().erro);
        expect(httpServico.post).toHaveBeenCalledWith(expect.any(String), expect.any(UsuarioModel));
    });
});