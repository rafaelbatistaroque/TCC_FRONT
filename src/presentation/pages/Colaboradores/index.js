import React from "react";
import { useNavigate } from "react-router";
import Header from "../../components/Header";
import ItemColaborador from "../../components/ItemColaborador";
import TituloPagina from "../../components/TituloPagina";
import { PerfilContext } from "../../hooks/perfilContext";
import styles from "./index.module.css";

const Colaboradores = ({ obterColaboradores }) => {
  const { setEhAutenticado } = React.useContext(PerfilContext);
  const [colaboradores, setColaboradores] = React.useState([]);
  const navegarPara = useNavigate();

  React.useEffect(() => {
    (async () => {
      const resposta = await obterColaboradores.handler();

      if (resposta?.naoAutorizado) {
        setEhAutenticado("");
        return navegarPara("/login");
        //TODO:mensagem: você não está logado
      }

      if (resposta.erro) //TODO: tratar erros diversos
        return console.log("erros", resposta.erros);

      setColaboradores(resposta);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <section className={`${styles.colaboradores} container conteudo`}>
        <TituloPagina tituloPagina="Colaboradores" />
        <ul className={styles.itensLista}>
          {colaboradores.length > 0 && colaboradores.map(({ id, nomeCompleto, numeroCPF, funcaoNome, funcaoId }) => (
            <ItemColaborador key={id} funcaoId={funcaoId} funcaoNome={funcaoNome} nomeCompleto={nomeCompleto} numeroCPF={numeroCPF} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default Colaboradores;
