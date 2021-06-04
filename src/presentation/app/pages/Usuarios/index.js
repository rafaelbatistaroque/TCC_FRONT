import React from 'react';
import { useNavigate } from 'react-router';
import { NAVEGACAO } from '../../../../main/utils/constantes';
import { BotaoForm, Input, TituloPagina } from '../../components';
import { ItemUsuario } from '../../components/ItemUsuario';
import useForm from '../../hooks/useForm';
import styles from './index.module.css';

export const Usuarios = ({ obterUsuarios, limparSessao }) => {
    const [usuarios, setUsuarios] = React.useState([]);
    const navegarPara = useNavigate();
    const pesquisa = useForm();

    React.useEffect(() => {
        handlerObterUsuario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlerObterUsuario = async () => {
        const { erro, statusCode, data } = await obterUsuarios.handler();

        if (erro && statusCode === 401) {
            limparSessao();
            return navegarPara(NAVEGACAO.TELA_LOGIN);
            //TODO:mensagem: você não está logado
        }

        if (erro) //TODO: tratar erros diversos
            return console.log("erros", data);

        setUsuarios(data.usuarios);
    };

    const handlerAlterarStatus = async (codigo) => {
        console.log(`alterar status de ${codigo}`);

        if (codigo === undefined) return;

        // const { erro, statusCode, data } = await deletarColaborador.handler(colaboradorId);

        // if (erro && statusCode === 401) {
        //     limparSessao();
        //     return navegarPara(NAVEGACAO.TELA_LOGIN);
        //     //TODO:mensagem: você não está logado
        // }

        // if (erro) //TODO: tratar erros diversos
        //     return console.log("erros", data);

        // setColaboradores(colaboradores.filter(x => x.id !== colaboradorId));
    };

    const handlerCriarUsuario = () => {
        navegarPara(NAVEGACAO.TELA_USUARIO_CRIAR);
    };

    const handlerVoltar = () => {
        navegarPara(NAVEGACAO.TELA_APP);
    };

    const filtro = (item) => {
        if (pesquisa.valor.length === 0)
            return true;

        return [Object.values(item).toString().toLowerCase()].some(x => x.includes(pesquisa.valor.toLowerCase()));
    };

    return <>
        <section className={`conteudo`}>
            <TituloPagina tituloPagina="Usuários do Sistema" />
            <ul className={`${styles.itensLista} animarFadeInDeCima`}>
                <div className={styles.cabecalhoLista}>
                    <div className={styles.botoesCabecalho}>
                        <BotaoForm finalidade={5} onClick={handlerVoltar} />
                        <BotaoForm finalidade={3} onClick={handlerCriarUsuario} />
                    </div>
                    <Input placeholder="Pesquisa" {...pesquisa} />
                </div>
                {usuarios.length > 0 && usuarios.filter(filtro).map((usuario) => (
                    <ItemUsuario key={`${usuario.codigo}${Date.now()}`}
                        usuario={usuario}
                        alterarStatus={handlerAlterarStatus}
                    />
                ))}
            </ul>
        </section>
    </>;

};