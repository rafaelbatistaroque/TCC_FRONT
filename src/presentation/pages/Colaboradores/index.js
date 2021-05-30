import React from "react";
import { useNavigate } from "react-router";
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
            return navegarPara("/login");
            //TODO:mensagem: você não está logado
        }

        if (erro) //TODO: tratar erros diversos
            return console.log("erros", data);

        setColaboradores(data.colaboradores);
    };

    const handlerDeletar = async (colaboradorId) => {
        const { erro, statusCode, data } = await deletarColaborador.handler(colaboradorId);

        if (erro && statusCode === 401) {
            limparSessao();
            return navegarPara("/login");
            //TODO:mensagem: você não está logado
        }

        if (erro) //TODO: tratar erros diversos
            return console.log("erros", data);

        setColaboradores(colaboradores.filter(x => x.id !== colaboradorId));
    };

    const handlerAlterar = (colaboradorId) => {
        navegarPara(`/app/colaborador/alterar/${colaboradorId}`);
    };

    return (
        <>
            <section className={`conteudo`}>
                <TituloPagina tituloPagina="Colaboradores" />
                <ul className={`${styles.itensLista} animarFadeInDeCima`}>
                    {colaboradores.length > 0 && colaboradores.map((colaborador) => (
                        <ItemColaborador key={colaborador.id}
                            colaborador={colaborador}
                            deletarColaborador={handlerDeletar}
                            alterarColaborador={handlerAlterar} />
                    ))}
                </ul>
            </section>
        </>
    );
};

export default Colaboradores;
