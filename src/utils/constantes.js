export const TEXTOS = {
    NAO_IMPLEMENTADO: "Método não implementado.",
    USUARIO_NULO_VAZIO: "Usuário não pode ser nulo ou vazio.",
    SENHA_NULA_VAZIA: "Senha não pode ser nulo ou vazio.",
    NAO_DELETAR_COLABORADOR: "Não foi possível deletar colaborador.",
    NAO_AUTORIZADA: "Requisição não autorizada.",
    PARAMETRO_INVALIDO: "Parametros inválidos."
};

export const FUNCOES_COLABORADOR = [
    { id: 1, item: "Gerente" },
    { id: 2, item: "Auxiliar Administrativo" },
    { id: 3, item: "Auxiliar de Escritório" },
    { id: 4, item: "Programador" },
    { id: 5, item: "Servicos Gerais" },
];

export const NAVEGACAO = {
    TELA_LOGIN: "/login",
    TELA_APP: "/app",
    TELA_COLABORADORES: "/app/colaborador/listar",
    TELA_COLABORADOR_ALTERAR: "/app/colaborador/alterar/",
    TELA_COLABORADOR_CRIAR: "/app/colaborador/criar/",
};
