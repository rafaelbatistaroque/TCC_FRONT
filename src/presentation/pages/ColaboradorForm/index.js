import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { FUNCOES_COLABORADOR, NAVEGACAO } from '../../../main/utils/constantes';
import Colaborador from "../../../main/models/Colaborador";
import { Button, Input, Select, TituloPagina } from '../../components';
import { PerfilContext } from '../../hooks/perfilContext';
import useForm from '../../hooks/useForm';
import styles from './index.module.css';

export const ColaboradorForm = ({ alterarColaborador, obterColaborador, criarColaborador }) => {
    const { limparSessao } = React.useContext(PerfilContext);
    const navegarPara = useNavigate();
    const { id } = useParams();
    const primeiroNomeForm = useForm();
    const sobrenomeForm = useForm();
    const funcaoForm = useForm();
    const cpfForm = useForm();
    const idForm = useForm();
    const [tituloPagina, setTituloPagina] = React.useState("Criar");
    const ehEdicao = React.useRef(id > 0);

    const handlerSelecionado = React.useRef(
        ehEdicao.current
            ? alterarColaborador
            : criarColaborador);

    React.useEffect(() => {
        if (ehEdicao.current === false)
            return;

        setTituloPagina("Editar");
        handlerObterColaborador(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handlerObterColaborador = async (id) => {
        const { erro, data, statusCode } = await obterColaborador.handler(id);

        if (erro && statusCode === 401) {
            limparSessao();
            return navegarPara(NAVEGACAO.TELA_LOGIN);
            //TODO:mensagem: você não está logado
        }

        if (erro) //TODO: tratar erros diversos
            return console.log("erros", data);

        preencherCamposFormulario(data);
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

    const funcaoSelecionada = async () => {
        const colaborador = Colaborador.criar(
            idForm.valor,
            cpfForm.valor,
            primeiroNomeForm.valor,
            sobrenomeForm.valor,
            funcaoForm.valor);

        const { erro, data, statusCode } = await handlerSelecionado.current.handler(colaborador);

        if (erro && statusCode === 401) {
            limparSessao();
            return navegarPara(NAVEGACAO.TELA_LOGIN);
            //TODO:mensagem: você não está logado
        }

        if (erro) //TODO: tratar erros diversos
            return console.log("erros", data);

        limparCamposFormulario();
        navegarPara(NAVEGACAO.TELA_COLABORADORES);
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