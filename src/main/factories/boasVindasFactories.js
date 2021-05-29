import BoasVindas from "../../presentation/pages/BoasVindas";

export const boasVindasFactories = (usuarioNome) => {
    return {
        build: () => <BoasVindas usuarioNome={usuarioNome} />
    };
};
