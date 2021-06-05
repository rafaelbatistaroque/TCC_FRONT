export default class UsuarioModel {
    usuarioNome;
    usuarioSenha;
    usuarioPerfil;
    usuarioCodigo;

    constructor({ usuarioNome, usuarioSenha, usuarioPerfilNumber, usuarioCodigo }) {
        this.usuarioNome = usuarioNome;
        this.usuarioSenha = usuarioSenha;
        this.usuarioPerfil = usuarioPerfilNumber;
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