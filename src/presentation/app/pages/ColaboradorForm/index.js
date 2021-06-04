import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { FUNCOES_COLABORADOR, NAVEGACAO, TEXTOS } from '../../../../main/utils/constantes';
import ColaboradorModel from "../../../../main/models/ColaboradorModel";
import { Button, Input, Select, TituloPagina } from '../../components';
import { PerfilContext } from '../../hooks/perfilContext';
import useForm from '../../hooks/useForm';
import styles from './index.module.css';
import { SnackbarContext } from '../../hooks/SnackbarContext';

export const ColaboradorForm = ({ alterarColaborador, obterColaborador, criarColaborador }) => {
    const { limparSessao } = React.useContext(PerfilContext);
    const { snackErro, snackSucesso } = React.useContext(SnackbarContext);
    const navegarPara = useNavigate();
    const { id } = useParams();
    const primeiroNomeForm = useForm();
    const sobrenomeForm = useForm();
    const funcaoForm = useForm(1);
    const cpfForm = useForm();
    const idForm = useForm();
    const [tituloPagina, setTituloPagina] = React.useState("Criar Colaborador");
    const ehEdicao = React.useRef(id > 0);

    const handlerSelecionado = React.useRef(
        ehEdicao.current
            ? alterarColaborador
            : criarColaborador);

    React.useEffect(() => {
        if (ehEdicao.current === false)
            return;

        setTituloPagina("Editar Colaborador");
        handlerObterColaborador(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const preencherCamposFormulario = ({ primeiroNome, sobrenome, funcaoId, numeroCPF, id }) => {
        primeiroNomeForm.setValor(primeiroNome);
        sobrenomeForm.setValor(sobrenome);
        funcaoForm.setValor(funcaoId);
        cpfForm.setValor(numeroCPF);
        idForm.setValor(id);
    };

    const limparCamposFormulario = () => {
        primeiroNomeForm.setValor("");
        sobrenomeForm.setValor("");
        funcaoForm.setValor("");
        cpfForm.setValor("");
        idForm.setValor("");
    };

    const handlerObterColaborador = async (id) => {
        const resposta = await obterColaborador.handler(id);

        validarResposta(resposta) && preencherCamposFormulario(resposta.data);
    };

    const funcaoSelecionada = async () => {
        const colaborador = ColaboradorModel.criar(
            idForm.valor,
            cpfForm.valor,
            primeiroNomeForm.valor,
            sobrenomeForm.valor,
            funcaoForm.valor);

        const resposta = await handlerSelecionado.current.handler(colaborador);

        if (validarResposta(resposta)) {
            limparCamposFormulario();
            snackSucesso(TEXTOS.RESGISTRO_SUCESSO);
            navegarPara(NAVEGACAO.TELA_COLABORADORES);
        }

    };

    const handlerCancelar = () => {
        navegarPara(NAVEGACAO.TELA_COLABORADORES);
    };

    return (<>

        <section className={`conteudo`}>
            <TituloPagina tituloPagina={tituloPagina} />
            <form className={`${styles.form} animarFadeInDeCima`}>
                <Input placeholder="Primeiro Nome" requirido={false} {...primeiroNomeForm} />
                <Input placeholder="Sobrenome" requirido={false} {...sobrenomeForm} />
                <Input placeholder="CPF: xxx.xxx.xxx-xx" maxCaracteres={14} {...cpfForm} disabled={ehEdicao.current} />
                <Select opcoes={FUNCOES_COLABORADOR} {...funcaoForm} />
                <div className={styles.grupoBotoes}>
                    <Button estiloEnfase={true} tipoButton="button" tituloBotao="Cancelar" onClick={handlerCancelar} />
                    <Button estiloEnfase={false} tipoButton="button" tituloBotao="Salvar" onClick={funcaoSelecionada} />
                </div>
            </form>
        </section></>);
};