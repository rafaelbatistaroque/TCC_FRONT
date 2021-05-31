import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { NAVEGACAO } from '../../../utils/constantes';
import BotaoForm from '../../components/BotaoForm';
import ItemArquivo from '../../components/ItemArquivo';
import TituloPagina from '../../components/TituloPagina';
import { PerfilContext } from '../../hooks/perfilContext';
import styles from './index.module.css';

const Arquivos = ({ obterArquivos }) => {
    const { limparSessao, colaborador } = React.useContext(PerfilContext);
    const [arquivos, setArquivos] = React.useState([]);
    const navegarPara = useNavigate();
    const { id } = useParams();

    React.useEffect(() => {
        handlerObterArquivo(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlerObterArquivo = async (id) => {
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

    return <>
        <section className={`conteudo`}>
            <TituloPagina tituloPagina={`Arquivos de ${colaborador}`} />
            <ul className={`${styles.itensLista} animarFadeInDeCima`}>
                <BotaoForm finalidade={3} onClick={() => { }} />
                {arquivos.length > 0 && arquivos.map((arquivo) => (
                    <ItemArquivo key={arquivo.id} arquivo={arquivo} downloadArquivo={handlerDownload} />
                ))}
            </ul>
        </section>
    </>;

};

export default Arquivos;