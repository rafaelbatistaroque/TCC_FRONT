import React from "react";
import { useNavigate } from "react-router-dom";
import { NAVEGACAO } from "../../../../main/utils/constantes";
import { Button, Input } from "../../components";
import { PerfilContext } from "../../hooks/perfilContext";
import { SnackbarContext } from "../../hooks/SnackbarContext";
import useForm from "../../hooks/useForm";
import styles from "./index.module.css";

export const Login = ({ autenticar }) => {
    const { snackErro } = React.useContext(SnackbarContext);
    const { salvarSessao } = React.useContext(PerfilContext);
    const usuario = useForm();
    const senha = useForm();
    const navegarPara = useNavigate();

    const limparCampos = () => {
        usuario.setValor("");
        senha.setValor("");
    };

    const handlerClique = async () => {
        const { erro, data } = await autenticar.handler(usuario.valor, senha.valor);

        if (erro) {
            limparCampos();
            return snackErro(data);
        }

        limparCampos();
        salvarSessao(data);
        navegarPara(NAVEGACAO.TELA_APP);
    };

    return (
        <section className={styles.background}>
            <form className={`${styles.formLogin} animarFadeInDeCima`}>
                <div className={styles.grupoInputs} onKeyPress={({ key }) => key === "Enter" && handlerClique()}>
                    <Input placeholder="Identificação" requirido={true} {...usuario} />
                    <Input placeholder="Senha" nomeInput="password" tipoInput="password" requirido={true} {...senha} />
                </div>
                <Button tipoButton="button" tituloBotao="Entrar" onClick={handlerClique} />
            </form>
        </section>
    );
};
