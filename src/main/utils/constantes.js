export const TEXTOS = {
    NAO_IMPLEMENTADO: "Método não implementado.",
    USUARIO_NULO_VAZIO: "Usuário não pode ser nulo ou vazio.",
    SENHA_NULA_VAZIA: "Senha não pode ser nulo ou vazio.",
    NAO_DELETAR_COLABORADOR: "Não foi possível deletar colaborador.",
    NAO_AUTORIZADA: "Requisição não autorizada.",
    PERMISSAO_NEGADA: "Permissão negada para esse tipo de operação.",
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
    TELA_ARQUIVOS: "/app/arquivo/listar/",
    TELA_ARQUIVOS_CRIAR: "/app/arquivo/criar/",
    TELA_USUARIO_ADICIONAR: "/app/usuario/adicionar/",
};

export const TIPO_ARQUIVO = [
    { id: 1, item: "Atestado" },
    { id: 2, item: "Cartão de ponto" },
    { id: 3, item: "holerite" },
];
