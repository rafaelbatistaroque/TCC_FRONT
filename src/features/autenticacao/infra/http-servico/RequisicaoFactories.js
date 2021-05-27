
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
}