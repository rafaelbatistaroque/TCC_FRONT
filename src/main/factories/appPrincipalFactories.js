import AppPrincipal from "../../presentation/components/AppPrincipal";

export const appPrincipalFactory = (ehPerfilAdministrador, usuarioNome) => {

    return {
        build: () => <AppPrincipal usuarioNome={usuarioNome} ehPerfilAdministrador={ehPerfilAdministrador} />
    };
};
