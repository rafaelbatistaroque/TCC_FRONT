import { AppPrincipal } from "../../presentation/components";

export const appPrincipalFactory = (ehPerfilAdministrador, usuarioNome) => {

    return {
        build: () => <AppPrincipal usuarioNome={usuarioNome} ehPerfilAdministrador={ehPerfilAdministrador} />
    };
};
