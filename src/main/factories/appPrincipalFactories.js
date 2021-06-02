import { AppPrincipal } from "../../presentation/app/components";

export const appPrincipalFactory = (usuarioNome, ehPerfilAdministrador, limparSessao) => {

    return {
        build: () => <AppPrincipal ehPerfilAdministrador={ehPerfilAdministrador} limparSessao={limparSessao} usuarioNome={usuarioNome} />
    };
};
