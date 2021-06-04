export default class UsuarioModel {
    usuarioNome;
    usuarioSenha;
    usuarioPerfil;
    usuarioCodigo;

    constructor({ usuarioNome, usuarioSenha, usuarioPerfil, usuarioCodigo }) {
        this.usuarioNome = usuarioNome;
        this.usuarioSenha = usuarioSenha;
        this.usuarioPerfil = usuarioPerfil;
        this.usuarioCodigo = usuarioCodigo;
    }

    static criar(usuarioNome, usuarioSenha, usuarioPerfil) {
        const usuarioPerfilNumber = Number.parseInt(usuarioPerfil);

        return new UsuarioModel({ usuarioNome, usuarioSenha, usuarioPerfilNumber });
    }

    static alterarStatus(usuarioCodigo) {
        return new UsuarioModel({ usuarioCodigo });
    }
}