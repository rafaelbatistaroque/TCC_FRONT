import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import CaixaMensagem from "../../components/CaixaMensagem";
import { PerfilContext } from "../../hooks/perfilContext";
import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import styles from "./index.module.css";

const Login = ({ autenticar }) => {

    const [mensagensErro, setMensagensErro] = React.useState([]);
    const { salvarSessao } = React.useContext(PerfilContext);
    const usuario = useForm();
    const senha = useForm();
    const navegarPara = useNavigate();

    React.useEffect(() => {
        limparCampos();
    }, []);

    async function handlerClique() {
        limparMensagemErro();
        const { erro, data } = await autenticar.handler(usuario.valor, senha.valor);

        if (erro)
            return setMensagensErro([...data]);

        limparCampos();
        salvarSessao(data);
        // atribuirRespostaNoContexto(data);
        navegarPara("/app");
    }

    function limparMensagemErro() {
        setMensagensErro([]);
    }

    function limparCampos() {
        usuario.setValor("");
        senha.setValor("");
    }

    return (
        <section className={styles.background}>
            <div className={`${styles.formLogin} animarFadeInDeCima`}>
                <div className={styles.grupoInputs}>
                    <Input
                        onFocus={limparMensagemErro}
                        placeholder="Identificação"
                        requirido={true}
                        {...usuario}
                    />
                    <Input
                        onFocus={limparMensagemErro}
                        placeholder="Senha"
                        tipoInput="password"
                        requirido={true}
                        {...senha}
                    />
                </div>
                {mensagensErro.length > 0 && (
                    <CaixaMensagem textoMensagem={mensagensErro} />
                )}
                <Button
                    tipoButton="button"
                    tituloBotao="Entrar"
                    onClick={handlerClique}
                />
            </div>
        </section>
    );
};

export default Login;
