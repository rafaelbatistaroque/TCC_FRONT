import Colaboradores from "../../presentation/pages/Colaboradores";

const colaboradorFactory = () => {
	return {
		build: () => <Colaboradores texto="TextoColaboradores" />,
	};
};

export default colaboradorFactory;
