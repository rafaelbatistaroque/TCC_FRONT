import { API } from "../utils/constantes";
import criarDependencias from "./dependenciasFactories";
import { ObterUsuariosHandler, CriarUsuarioHandler } from "../../features/business/services/usuario";
import { Usuarios } from "../../presentation/app/pages";
import { UsuarioForm } from "../../presentation/app/pages/UsuarioForm";

export const usuarioFactory = (token, limparSessao) => {
    const url = `${API.urlBase}${API.usuario}/`;
    const { validacoes, httpServico } = criarDependencias(token);
    const obterUsuarios = new ObterUsuariosHandler(url, { httpServico }, validacoes);

    return {
        build: () => <Usuarios limparSessao={limparSessao} obterUsuarios={obterUsuarios} />,
    };
};

export const usuarioFormFactory = (token, limparSessao) => {
    const url = `${API.urlBase}${API.usuario}/`;
    const { validacoes, httpServico } = criarDependencias(token);
    const criarUsuario = new CriarUsuarioHandler(url, { httpServico }, validacoes);

    return {
        build: () => <UsuarioForm limparSessao={limparSessao} criarUsuario={criarUsuario} />,
    };
};