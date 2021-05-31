import React from "react";
import { useNavigate } from "react-router";
import { NAVEGACAO } from "../../../utils/constantes";
import BotaoColaborador from "../../components/BotaoColaborador";
import ItemColaborador from "../../components/ItemColaborador";
import TituloPagina from "../../components/TituloPagina";
import { PerfilContext } from "../../hooks/perfilContext";
import styles from "./index.module.css";

const Colaboradores = ({ obterColaboradores, deletarColaborador }) => {
    const { limparSessao } = React.useContext(PerfilContext);
    const [colaboradores, setColaboradores] = React.useState([]);
    const navegarPara = useNavigate();

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

        navegarPara(`${NAVEGACAO.TELA_COLABORADOR_ALTERAR}${colaboradorId}`);
    };

    const handlerCriarColaborador = () => {
        navegarPara(NAVEGACAO.TELA_COLABORADOR_CRIAR);
    };

    return (
        <>
            <section className={`conteudo`}>
                <TituloPagina tituloPagina="Colaboradores" />
                <ul className={`${styles.itensLista} animarFadeInDeCima`}>
                    <BotaoColaborador finalidade={3} onClick={handlerCriarColaborador} />
                    {colaboradores.length > 0 && colaboradores.map((colaborador) => (
                        <ItemColaborador key={colaborador.id}
                            colaborador={colaborador}
                            visualizarDocumentos={handlerVisualizarDocumentos}
                            deletarColaborador={handlerDeletar}
                            alterarColaborador={handlerAlterar} />
                    ))}
                </ul>
            </section>
        </>
    );
};

export default Colaboradores;
