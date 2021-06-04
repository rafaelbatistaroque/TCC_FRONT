export const TEXTOS = {
    NAO_IMPLEMENTADO: "Método não implementado.",
    USUARIO_NULO_VAZIO: "Usuário não pode ser nulo ou vazio.",
    SENHA_NULA_VAZIA: "Senha não pode ser nulo ou vazio.",
    NAO_DELETAR_COLABORADOR: "Não foi possível deletar este colaborador.",
    NAO_DELETAR_ARQUIVO: "Não foi possível deletar este aquivo.",
    NAO_AUTORIZADA: "Requisição não autorizada.",
    PERMISSAO_NEGADA: "Permissão negada para esse tipo de operação.",
    NAO_LOGADO: "Você não está logado(a).",
    PARAMETRO_INVALIDO: "Parametros inválidos.",
    RESGISTRO_SUCESSO: "Registro Salvo.",
    DELETADO_SUCESSO: "Registro Deletado.",
    MES_INVALIDO: "O campo mês é inválido.",
    ANO_INVALIDO: "O campo ano é invalido",
    ANEXO_INVALIDO: "O campo anexo é invalido",
};

export const FUNCOES_COLABORADOR = [
    { id: 1, item: "Gerente" },
    { id: 2, item: "Auxiliar Administrativo" },
    { id: 3, item: "Auxiliar de Escritório" },
    { id: 4, item: "Programador" },
    { id: 5, item: "Servicos Gerais" },
];

export const PERFIS_USUARIO = [
    { id: 1, item: "Administrador" },
    { id: 2, item: "Usuário" },
];

export const NAVEGACAO = {
    TELA_LOGIN: "/login",
    TELA_APP: "/app",
    TELA_COLABORADORES: "/app/colaborador/listar/",
    TELA_COLABORADOR_ALTERAR: "/app/colaborador/alterar/",
    TELA_COLABORADOR_CRIAR: "/app/colaborador/criar/",
    TELA_ARQUIVOS: "/app/arquivo/listar/",
    TELA_ARQUIVOS_CRIAR: "/app/arquivo/criar/",
    TELA_USUARIO_LISTAR: "/app/usuario/listar/",
    TELA_USUARIO_CRIAR: "/app/usuario/criar/",
};

export const ROTA = {
    COLABORADOR_ALTERAR_ID: "/colaborador/alterar/:id",
    DOWNLOAD_ARQUIVO: "/api/v1/arquivo/:id/:codigo",
    COLABORADORES_LISTAR: "/colaborador/listar/",
    ARQUIVO_LISTAR_ID: "/arquivo/listar/:id",
    COLABORADOR_CRIAR: "/colaborador/criar/",
    ARQUIVO_CRIAR_ID: "/arquivo/criar/:id",
    USUARIO_LISTAR: "/usuario/listar/",
    USUARIO_CRIAR: "/usuario/criar/",
    LOGIN: "/login",
    APP: "/app",
    ROOT: "/",
};

export const TIPO_ARQUIVO = [
    { id: 1, item: "Atestado" },
    { id: 2, item: "Cartão de ponto" },
    { id: 3, item: "holerite" },
];

export const API = {
    urlBase: "https://localhost:5001/api/v1",
    altenticacao: "/autenticacao",
    colaborador: "/colaborador",
    arquivo: "/arquivo",
    usuario: "/usuario",
};
