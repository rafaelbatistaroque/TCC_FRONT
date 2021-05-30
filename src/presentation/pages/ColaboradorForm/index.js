import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { FUNCOES_COLABORADOR } from '../../../utils/constantes';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TituloPagina from '../../components/TituloPagina';
import { PerfilContext } from '../../hooks/perfilContext';
import useForm from '../../hooks/useForm';
import styles from './index.module.css';

const ColaboradorForm = ({ alterarColaborador, obterColaborador, criarColaborador }) => {
    const TELA_COLABORADOR_LISTA = "/app/colaborador/listar";
    const TELA_LOGIN = "/login";

    const { limparSessao } = React.useContext(PerfilContext);
    const navegarPara = useNavigate();
    const { id } = useParams();
    const primeiroNomeForm = useForm();
    const sobrenomeForm = useForm();
    const funcaoForm = useForm();
    const cpfForm = useForm();
    const idForm = useForm();

    React.useEffect(() => {
        if (id === undefined)
            return;

        handlerObterColaborador(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlerObterColaborador = async (id) => {
        const { erro, data, statusCode } = await obterColaborador.handler(id);

        if (erro && statusCode === 401) {
            limparSessao();
            return navegarPara(TELA_LOGIN);
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
        const { erro, data, statusCode } = await alterarColaborador.handler(
            idForm.valor,
            primeiroNomeForm.valor,
            sobrenomeForm.valor,
            funcaoForm.valor);

        if (erro && statusCode === 401) {
            limparSessao();
            return navegarPara(TELA_LOGIN);
            //TODO:mensagem: você não está logado
        }

        if (erro) //TODO: tratar erros diversos
            return console.log("erros", data);

        limparCamposFormulario();
        navegarPara(TELA_COLABORADOR_LISTA);
    };

    const handlerCancelar = () => {
        navegarPara(TELA_COLABORADOR_LISTA);
    };

    return (<>

        <section className={`conteudo`}>
            <TituloPagina tituloPagina="Editar Colaborador" />
            <form className={`${styles.form} animarFadeInDeCima`}>
                <Input placeholder="Primeiro Nome" requirido={false} {...primeiroNomeForm} />
                <Input placeholder="Sobrenome" requirido={false} {...sobrenomeForm} />
                <Input placeholder="CPF" disabled={true} valor={cpfForm.valor} />
                <Select opcoes={FUNCOES_COLABORADOR} {...funcaoForm} />
                <div className={styles.grupoBotoes}>
                    <Button estiloEnfase={true} tipoButton="button" tituloBotao="Cancelar" onClick={handlerCancelar} />
                    <Button estiloEnfase={false} tipoButton="button" tituloBotao="Salvar" onClick={funcaoSelecionada} />
                </div>
            </form>
        </section></>);
};

export default ColaboradorForm;