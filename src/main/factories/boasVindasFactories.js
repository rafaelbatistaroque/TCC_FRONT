import { BoasVindas } from "../../presentation/pages";

export const boasVindasFactories = (usuarioNome) => {
    return {
        build: () => <BoasVindas usuarioNome={usuarioNome} />
    };
};
