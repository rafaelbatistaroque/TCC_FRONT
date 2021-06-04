import React from "react";
import { useNavigate } from "react-router";
import { NAVEGACAO, TEXTOS } from "../../../../main/utils/constantes";
import { BotaoForm, Input, ItemColaborador, TituloPagina } from "../../components";
import { SnackbarContext } from "../../hooks/SnackbarContext";
import useForm from "../../hooks/useForm";
import styles from "./index.module.css";

export const Colaboradores = ({ obterColaboradores, deletarColaborador, ehPerfilAdministrador, limparSessao }) => {
    const { snackErro } = React.useContext(SnackbarContext);
    const [colaboradores, setColaboradores] = React.useState([]);
    const navegarPara = useNavigate();
    const pesquisa = useForm();

    React.useEffect(() => {
        handlerObterColaboradores();
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

    const handlerObterColaboradores = async () => {
        const resposta = await obterColaboradores.handler();

        validarResposta(resposta) && setColaboradores(resposta.data.colaboradores);
    };

    const handlerDeletar = async (colaboradorId) => {
        if (colaboradorId === undefined) return;

        const resposta = await deletarColaborador.handler(colaboradorId);

        validarResposta(resposta) && setColaboradores(colaboradores.filter(x => x.id !== colaboradorId));
    };

    const handlerAlterar = (colaboradorId) => {
        if (colaboradorId === undefined) return;

        navegarPara(`${NAVEGACAO.TELA_COLABORADOR_ALTERAR}${colaboradorId}`);
    };

    const handlerVisualizarDocumentos = (colaboradorId) => {
        if (colaboradorId === undefined) return;

        navegarPara(`${NAVEGACAO.TELA_ARQUIVOS}${colaboradorId}`);
    };

    const handlerCriarColaborador = () => {
        navegarPara(NAVEGACAO.TELA_COLABORADOR_CRIAR);
    };

    const handlerVoltar = () => {
        navegarPara(NAVEGACAO.TELA_APP);
    };

    const filtro = (item) => {
        if (pesquisa.valor.length === 0)
            return true;

        return [Object.values(item).toString().toLowerCase()].some(x => x.includes(pesquisa.valor.toLowerCase()));
    };

    return (
        <>
            <section className={`conteudo`}>
                <TituloPagina tituloPagina="Colaboradores" />
                <ul className={`${styles.itensLista} animarFadeInDeCima`}>
                    <div className={styles.cabecalhoLista}>
                        <div className={styles.botoesCabecalho}>
                            <BotaoForm finalidade={5} onClick={handlerVoltar} />
                            {ehPerfilAdministrador && <BotaoForm finalidade={3} onClick={handlerCriarColaborador} />}
                        </div>
                        {colaboradores.length > 1 && <Input placeholder="Pesquisa" {...pesquisa} />}
                    </div>
                    {colaboradores.length > 0 && colaboradores.filter(filtro).map((colaborador) => (
                        <ItemColaborador key={colaborador.id}
                            colaborador={colaborador}
                            visualizarDocumentos={handlerVisualizarDocumentos}
                            deletarColaborador={handlerDeletar}
                            alterarColaborador={handlerAlterar}
                            ehPerfilAdministrador={ehPerfilAdministrador}
                        />
                    ))}
                </ul>
            </section>
        </>
    );
};
