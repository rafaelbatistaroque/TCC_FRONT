import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { NAVEGACAO, TEXTOS } from "../../../../main/utils/constantes";
import { BotaoForm, Input, ItemArquivo, TituloPagina } from '../../components';
import { SnackbarContext } from '../../hooks/SnackbarContext';
import useForm from '../../hooks/useForm';
import styles from './index.module.css';

export const Arquivos = ({ obterArquivos, obterColaborador, deletarArquivo, limparSessao }) => {
    const { snackErro, snackSucesso } = React.useContext(SnackbarContext);
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

    async function handlerObterColaborador() {
        const resposta = await obterColaborador.handler(id);

        validarResposta(resposta) && setColaborador(resposta.data.primeiroNome);
    };

    async function handlerObterArquivo(arquivoId) {
        if (arquivoId === undefined)
            return;

        const resposta = await obterArquivos.handler(id);

        validarResposta(resposta) && setArquivos(resposta.data.arquivos);
    };

    const handlerDeletarArquivo = async (arquivoId) => {
        if (arquivoId === undefined)
            return;

        const resposta = await deletarArquivo.handler(arquivoId);

        if (validarResposta(resposta)) {
            setArquivos(arquivos.filter(x => x.id !== arquivoId));
            snackSucesso(TEXTOS.DELETADO_SUCESSO);
        }
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
                    {arquivos.length > 1 && <Input placeholder="Pesquisa" {...pesquisa} />}
                </div>
                {arquivos.length > 0 && arquivos.filter(filtro).map((arquivo) => (
                    <ItemArquivo key={arquivo.id} arquivo={arquivo} deletarArquivo={handlerDeletarArquivo} downloadArquivo={handlerDownload} />
                ))}
            </ul>
        </section>
    </>;

};