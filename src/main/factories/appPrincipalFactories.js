import { AppPrincipal } from "../../presentation/app/components";

export const appPrincipalFactory = (ehPerfilAdministrador, usuarioNome) => {

    return {
        build: () => <AppPrincipal usuarioNome={usuarioNome} ehPerfilAdministrador={ehPerfilAdministrador} />
    };
};
