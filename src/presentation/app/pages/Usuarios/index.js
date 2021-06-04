import React from 'react';
import { useNavigate } from 'react-router';
import UsuarioModel from '../../../../main/models/UsuarioModel';
import { NAVEGACAO, TEXTOS } from '../../../../main/utils/constantes';
import { BotaoForm, Input, TituloPagina } from '../../components';
import { ItemUsuario } from '../../components/ItemUsuario';
import { SnackbarContext } from '../../hooks/SnackbarContext';
import useForm from '../../hooks/useForm';
import styles from './index.module.css';

export const Usuarios = ({ obterUsuarios, alterarStatus, limparSessao }) => {
    const [usuarios, setUsuarios] = React.useState([]);
    const { snackErro, snackSucesso } = React.useContext(SnackbarContext);
    const navegarPara = useNavigate();
    const pesquisa = useForm();

    React.useEffect(() => {
        handlerObterUsuario();
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

    const handlerObterUsuario = async () => {
        const resposta = await obterUsuarios.handler();

        validarResposta(resposta) && setUsuarios(resposta.data.usuarios);
    };

    const handlerAlterarStatus = async (codigo) => {
        if (codigo === undefined) return;

        const usuario = UsuarioModel.alterarStatus(codigo);
        const resposta = await alterarStatus.handler(usuario);

        if (validarResposta(resposta)) {
            snackSucesso(TEXTOS.RESGISTRO_SUCESSO);
            await handlerObterUsuario();
        }
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
                    {usuarios.length > 1 && <Input placeholder="Pesquisa" {...pesquisa} />}
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