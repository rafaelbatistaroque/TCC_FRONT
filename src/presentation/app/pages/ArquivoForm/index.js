import React from 'react';
import { useNavigate, useParams } from 'react-router';
import ArquivoModel from "../../../../main/models/ArquivoModel";
import { NAVEGACAO, TEXTOS, TIPO_ARQUIVO } from '../../../../main/utils/constantes';
import { Button, Input, InputAnexo, InputTextArea, Select, TituloPagina } from '../../components';
import { SnackbarContext } from '../../hooks/SnackbarContext';
import useForm from "../../hooks/useForm";
import useFormAnexo from "../../hooks/useFormAnexo";
import styles from './index.module.css';

export const ArquivoForm = ({ criarArquivo, limparSessao }) => {
    const { snackErro, snackSucesso } = React.useContext(SnackbarContext);
    const { id } = useParams();
    const navegarPara = useNavigate();
    const mesRef = useForm();
    const anoRef = useForm();
    const anexo = useFormAnexo();
    const tipoArquivo = useForm();
    const observacoes = useForm();

    const validarResposta = (resposta) => {
        const { erro, statusCode, data } = resposta;

        if (erro && statusCode === 401) {
            limparSessao();
            snackErro(TEXTOS.NAO_LOGADO);
            navegarPara(NAVEGACAO.TELA_LOGIN);
            return false;
        }

        if (erro) {
            snackErro(data);
            return false;
        }

        return true;
    };

    const limparCamposFormulario = () => {
        mesRef.setValor("");
        anoRef.setValor("");
        anexo.setValor("");
        tipoArquivo.setValor("");
        observacoes.setValor("");
    };

    const handlerSalvar = async () => {
        const arquivo = ArquivoModel.criar(
            id,
            mesRef.valor,
            anoRef.valor,
            tipoArquivo.valor,
            anexo.valor,
            observacoes.valor);

        const resposta = await criarArquivo.handler(arquivo);

        if (validarResposta(resposta)) {
            limparCamposFormulario();
            snackSucesso(TEXTOS.RESGISTRO_SUCESSO);
            navegarPara(`${NAVEGACAO.TELA_ARQUIVOS}${id}`);
        }
    };

    const handlerCancelar = () => {
        navegarPara(`${NAVEGACAO.TELA_ARQUIVOS}${id}`);
    };

    return (<>
        <section className={`conteudo`}>
            <TituloPagina tituloPagina="Criar Arquivo" />
            <form className={`${styles.form} animarFadeInDeCima`}>
                <div className={styles.grupo}>
                    <Input placeholder="Mês Referência. ex: 05" maxCaracteres={2} requirido={false} {...mesRef} />
                    <Input placeholder="Ano referência. ex: 2021" maxCaracteres={4} requirido={false} {...anoRef} />
                </div>
                <div className={styles.grupo}>
                    <InputAnexo placeholder="Anexo" {...anexo} />
                    <Select opcoes={TIPO_ARQUIVO} requirido={true} {...tipoArquivo} />
                </div>
                <InputTextArea placeholder="Observações" linhas={3} quantidadeMaxCaracter={200} {...observacoes} />
                <div className={styles.grupoBotoes}>
                    <Button estiloEnfase={true} tipoButton="button" tituloBotao="Cancelar" onClick={handlerCancelar} />
                    <Button estiloEnfase={false} tipoButton="button" tituloBotao="Salvar" onClick={handlerSalvar} />
                </div>
            </form>
        </section>
    </>);

};