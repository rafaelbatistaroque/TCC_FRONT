import React from "react";
import { useNavigate } from "react-router-dom";
import { CaixaMensagem, Input, Button } from "../../components";
import { PerfilContext } from "../../hooks/perfilContext";
import useForm from "../../hooks/useForm";
import styles from "./index.module.css";
import { NAVEGACAO } from "../../../../main/utils/constantes";

export const Login = ({ autenticar }) => {

    const [mensagensErro, setMensagensErro] = React.useState([]);
    const { salvarSessao } = React.useContext(PerfilContext);
    const usuario = useForm();
    const senha = useForm();
    const navegarPara = useNavigate();

    React.useEffect(() => {
        limparMensagemErro();
    }, []);

    const limparMensagemErro = () => {
        setMensagensErro([]);
    };

    const limparCampos = () => {
        usuario.setValor("");
        senha.setValor("");
    };

    const handlerClique = async () => {
        limparMensagemErro();
        const { erro, data } = await autenticar.handler(usuario.valor, senha.valor);

        if (erro) {
            limparCampos();
            return setMensagensErro([...data]);
        }

        limparCampos();
        salvarSessao(data);
        navegarPara(NAVEGACAO.TELA_APP);
    };


    return (
        <section className={styles.background}>
            <form className={`${styles.formLogin} animarFadeInDeCima`}>
                <div className={styles.grupoInputs} onKeyPress={({ key }) => key === "Enter" && handlerClique()}>
                    <Input onFocus={limparMensagemErro} placeholder="Identificação" requirido={true} {...usuario} />
                    <Input onFocus={limparMensagemErro} placeholder="Senha" nomeInput="password" tipoInput="password" requirido={true} {...senha} />
                </div>
                {mensagensErro.length > 0 && (
                    <CaixaMensagem textoMensagem={mensagensErro} />
                )}
                <Button tipoButton="button" tituloBotao="Entrar" onClick={handlerClique} />
            </form>
        </section>
    );
};
