import { BoasVindas } from "../../presentation/app/pages";

export const boasVindasFactories = (usuarioNome) => {
    return {
        build: () => <BoasVindas usuarioNome={usuarioNome} />
    };
};
