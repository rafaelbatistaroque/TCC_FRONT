export default class UsuarioModel {
    usuarioNome;
    usuarioSenha;
    usuarioPerfil;

    constructor(id, usuarioNome, usuarioSenha, usuarioPerfil) {
        this.usuarioNome = usuarioNome;
        this.usuarioSenha = usuarioSenha;
        this.usuarioPerfil = usuarioPerfil;
    }

    static criar(usuarioNome, usuarioSenha, usuarioPerfil) {
        const usuarioPerfilNumber = Number.parseInt(usuarioPerfil);

        return new UsuarioModel(usuarioNome, usuarioSenha, usuarioPerfilNumber);
    }
}