import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { NAVEGACAO } from "../../../../main/utils/constantes";
import { BotaoForm, Input, ItemArquivo, TituloPagina } from '../../components';
import useForm from '../../hooks/useForm';
import styles from './index.module.css';

export const Arquivos = ({ obterArquivos, obterColaborador, limparSessao }) => {
    const [arquivos, setArquivos] = React.useState([]);
    const [colaborador, setColaborador] = React.useState("");
    const pesquisa = useForm();
    const navegarPara = useNavigate();
    const { id } = useParams();

    React.useEffect(() => {
        handlerObterArquivo(id);
        handlerObterColaborador();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handlerObterColaborador() {
        const { erro, statusCode, data } = await obterColaborador.handler(id);

        if (erro && statusCode === 401) {
            limparSessao();
            return navegarPara(NAVEGACAO.TELA_LOGIN);
            //TODO:mensagem: você não está logado
        }

        if (erro) //TODO: tratar erros diversos
            return console.log("erros", data);

        setColaborador(data.primeiroNome);
    };

    async function handlerObterArquivo(id) {
        const { erro, statusCode, data } = await obterArquivos.handler(id);

        if (erro && statusCode === 401) {
            limparSessao();
            return navegarPara(NAVEGACAO.TELA_LOGIN);
            //TODO:mensagem: você não está logado
        }

        if (erro) //TODO: tratar erros diversos
            return console.log("erros", data);

        setArquivos(data.arquivos);
    };

    const handlerDownload = (url) => {
        if (url === undefined)
            return;

        window.open(url, "_blank");
    };

    const handlerCriarArquivo = () => {
        navegarPara(`${NAVEGACAO.TELA_ARQUIVOS_CRIAR}${id}`);
    };

    const filtro = (item) => {
        if (pesquisa.valor.length === 0)
            return true;

        const { nome, extensao } = item.anexo;
        return [Object.values({ ...item, nome, extensao }).toString().toLowerCase()].some(x => x.includes(pesquisa.valor.toLowerCase()));
    };

    const handlerVoltar = () => {
        navegarPara(NAVEGACAO.TELA_COLABORADORES);
    };

    return <>
        <section className={`conteudo`}>
            <TituloPagina tituloPagina={`Arquivos de ${colaborador}`} />
            <ul className={`${styles.itensLista} animarFadeInDeCima`}>
                <div className={styles.cabecalhoLista}>
                    <div className={styles.botoesCabecalho}>
                        <BotaoForm finalidade={5} onClick={handlerVoltar} />
                        <BotaoForm finalidade={3} onClick={handlerCriarArquivo} />
                    </div>
                    <Input placeholder="Pesquisa" {...pesquisa} />
                </div>
                {arquivos.length > 0 && arquivos.filter(filtro).map((arquivo) => (
                    <ItemArquivo key={arquivo.id} arquivo={arquivo} downloadArquivo={handlerDownload} />
                ))}
            </ul>
        </section>
    </>;

};