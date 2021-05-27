import React from "react";
import { BrowserRouter } from "react-router-dom";
import colaboradorFactory from "../main/factories/colaboradorFactory";
import loginFactory from "../main/factories/loginFactory";
import { PerfilProvider } from "./hooks/perfilContext";
import Rotas from "./Rotas";

const App = () => {
	return (
		<BrowserRouter>
			<PerfilProvider>
				<Rotas login={loginFactory().build()} colaborador={colaboradorFactory().build()} />
			</PerfilProvider>
		</BrowserRouter>
	);
};

export default App;
