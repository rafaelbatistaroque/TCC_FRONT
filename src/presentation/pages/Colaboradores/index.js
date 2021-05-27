import React from "react";
import Header from "../../components/Header";
import styles from "./index.module.css";

const Colaboradores = ({ obterColaboradores }) => {
  const colaboradores = obterColaboradores.handler();
  const lista = [];

  return (
    <>
      <Header />
      <section className={`${styles.itemsLista} container`}>
        <div className={styles.itemLista}>
          {lista.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Colaboradores;
