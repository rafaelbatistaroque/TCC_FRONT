export default class Response {
	static unauthorized() {
        return {
            erro: true,
            statusCode: 401
		}
    };

    static badRequest(data) {
        return {
            erro: true,
			statusCode: 400,
			data
		}
    }

    static erroInesperado() {
        return {
            erro: true,
			statusCode: 500
		}
    }

    static ok(data) {
        return {
            erro: false,
			statusCode: 200,
			data
		}
	}
}