export default class Response {
    #statusCode;
    #erro;
    #data;

    constructor(statusCode, erro, data) {
        this.#statusCode = statusCode;
        this.#erro = erro;
        this.#data = data;
    }

    static unauthorized(data) {
        return {
            erro: true,
            statusCode: 401
        };
    }

    static criar(promise, data) {

        const errosDeResponse = {
            400: new Response(400, true, data.erros),
            500: new Response(500, true),
            200: new Response(200, false, data)
        };

        if (promise.status in errosDeResponse === false)
            return errosDeResponse[500];

        return errosDeResponse[promise.status];
    }

    get obterResponse() {
        return {
            statusCode: this.#statusCode,
            erro: this.#erro,
            data: this.#data
        };
    }
}