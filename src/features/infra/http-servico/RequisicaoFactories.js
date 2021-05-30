export default class Requisicao {

    static criarPost(body, token) {
        return {
            options: {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                }
            },
        };
    }

    static criarGet(token) {
        return {
            options: {
                method: "GET",
                headers: {
                    authorization: token
                }
            },
        };
    }

    static criarDelete(token) {
        return {
            options: {
                method: "DELETE",
                headers: {
                    authorization: token
                }
            },
        };
    }

    static criarPut(token, body) {
        return {
            options: {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                }
            },
        };
    }
}