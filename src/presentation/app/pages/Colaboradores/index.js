import React from "react";
import { useNavigate } from "react-router";
import { NAVEGACAO } from "../../../../main/utils/constantes";
import { BotaoForm, Input, ItemColaborador, TituloPagina } from "../../components";
import useForm from "../../hooks/useForm";
import styles from "./index.module.css";

export const Colaboradores = ({ obterColaboradores, deletarColaborador, ehPerfilAdministrador, limparSessao }) => {
    const [colaboradores, setColaboradores] = React.useState([]);
    const navegarPara = useNavigate();
    const pesquisa = useForm();

    React.useEffect(() => {
        handlerObterColaboradores();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlerObterColaboradores = async () => {
        const { erro, statusCode, data } = await obterColaboradores.handler();

        if (erro && statusCode === 401) {
            limparSessao();
            return navegarPara(NAVEGACAO.TELA_LOGIN);
            //TODO:mensagem: você não está logado
        }

        if (erro) //TODO: tratar erros diversos
            return console.log("erros", data);

        setColaboradores(data.colaboradores);
    };

    const handlerDeletar = async (colaboradorId) => {
        if (colaboradorId === undefined) return;

        const { erro, statusCode, data } = await deletarColaborador.handler(colaboradorId);

        if (erro && statusCode === 401) {
            limparSessao();
            return navegarPara(NAVEGACAO.TELA_LOGIN);
            //TODO:mensagem: você não está logado
        }

        if (erro) //TODO: tratar erros diversos
            return console.log("erros", data);

        setColaboradores(colaboradores.filter(x => x.id !== colaboradorId));
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
                        <Input placeholder="Pesquisa" {...pesquisa} />
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
