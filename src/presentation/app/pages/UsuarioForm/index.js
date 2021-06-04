import React from 'react';
import UsuarioModel from "../../../../main/models/UsuarioModel";
import { useNavigate } from 'react-router';
import { NAVEGACAO, PERFIS_USUARIO, TEXTOS } from '../../../../main/utils/constantes';
import { Button, Input, Select, TituloPagina } from '../../components';
import useForm from '../../hooks/useForm';
import styles from './index.module.css';
import { SnackbarContext } from '../../hooks/SnackbarContext';

export const UsuarioForm = ({ limparSessao, criarUsuario }) => {
    const { snackErro, snackSucesso } = React.useContext(SnackbarContext);
    const navegarPara = useNavigate();
    const usuarioNomeForm = useForm();
    const usuarioSenhaForm = useForm();
    const perfilForm = useForm(2);

    const limparCamposFormulario = () => {
        usuarioNomeForm.setValor("");
        usuarioSenhaForm.setValor("");
        perfilForm.setValor(2);
    };

    const handlerSalvar = async () => {
        const arquivo = UsuarioModel.criar(
            usuarioNomeForm.valor,
            usuarioSenhaForm.valor,
            perfilForm.valor);

        const { erro, data, statusCode } = await criarUsuario.handler(arquivo);

        if (erro && statusCode === 401) {
            limparSessao();
            snackErro(TEXTOS.NAO_LOGADO);
            return navegarPara(NAVEGACAO.TELA_LOGIN);
        }

        if (erro)
            return snackErro(data);

        limparCamposFormulario();
        snackSucesso(TEXTOS.RESGISTRO_SUCESSO);
        navegarPara(`${NAVEGACAO.TELA_USUARIO_LISTAR}`);
    };

    const handlerCancelar = () => {
        navegarPara(`${NAVEGACAO.TELA_USUARIO_LISTAR}`);
    };

    return (<>

        <section className={`conteudo`}>
            <TituloPagina tituloPagina="Criar Usuário" />
            <form className={`${styles.form} animarFadeInDeCima`}>
                <Input placeholder="Primeiro Nome" requirido={false} {...usuarioNomeForm} />
                <Input placeholder="Senha" tipoInput="password" requirido={false} {...usuarioSenhaForm} />
                <Select opcoes={PERFIS_USUARIO} {...perfilForm} />
                <div className={styles.grupoBotoes}>
                    <Button estiloEnfase={true} tipoButton="button" tituloBotao="Cancelar" onClick={handlerCancelar} />
                    <Button estiloEnfase={false} tipoButton="button" tituloBotao="Salvar" onClick={handlerSalvar} />
                </div>
            </form>
        </section></>);

};