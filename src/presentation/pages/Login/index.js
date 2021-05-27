import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import CaixaMensagem from "../../components/CaixaMensagem";
import Input from "../../components/Input";
import { PerfilContext } from "../../hooks/perfilContext";
import useForm from "../../hooks/useForm";
import styles from "./index.module.css";

const Login = ({ autenticar }) => {
	const [mensagensErro, setMensagensErro] = React.useState([]);
	const { setEhAutenticado, setPerfilId, setUsuarioNome } = React.useContext(PerfilContext);
	const usuario = useForm();
	const senha = useForm();
	const navegarPara = useNavigate();

	React.useEffect(() => {
		limparCampos();
	},[])

	async function handlerClique() {
		limparMensagemErro();
		const resposta = await autenticar.handler(usuario.valor, senha.valor);

		if (resposta.erro)
			return setMensagensErro([...resposta.data]);

		atribuirRespostaNoContexto(resposta.data)
		limparCampos();

		navegarPara('/colaborador');
	}

	function limparMensagemErro() {
		setMensagensErro([]);
	}

	function limparCampos() {
		usuario.setValor("");
		senha.setValor("");
	}

	function atribuirRespostaNoContexto(resposta) {
		setEhAutenticado(resposta.token)
		setPerfilId(resposta.perfilId)
		setUsuarioNome(resposta.nomeUsuario)
		console.log("passou",resposta);
	}

	return (
		<div className={styles.background}>
			<div className={`${styles.formLogin} animarFadeInDeCima`}>
				<div className={styles.grupoInputs}>
					<Input onFocus={limparMensagemErro} placeholder="Identificação" requirido={true} {...usuario} />
					<Input onFocus={limparMensagemErro} placeholder="Senha" tipoInput="password" requirido={true} {...senha} />
				</div>
				{mensagensErro.length > 0 && <CaixaMensagem textoMensagem={mensagensErro} />}
				<Button tipoButton="button" tituloBotao="Entrar" onClick={handlerClique} />
			</div>
		</div>
	);
};

export default Login;
