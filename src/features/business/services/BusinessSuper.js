import { TEXTOS } from "../../../main/utils/constantes";

export default class BusinessSuper {
    handler() {
        throw new Error(TEXTOS.NAO_IMPLEMENTADO);
    }

    validar() {
        throw new Error(TEXTOS.NAO_IMPLEMENTADO);
    }
}
