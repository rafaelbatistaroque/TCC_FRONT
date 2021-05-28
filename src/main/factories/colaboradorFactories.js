import React from "react";
import { DeletarColaboradorHandler } from "../../features/business/services/colaboradores/DeletarColaboradorHandler";
import ObterColaboradoresHandler from "../../features/business/services/colaboradores/ObterColaboradoresHandler";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Colaboradores from "../../presentation/pages/Colaboradores";
import API from "../../utils/urlApi";
import Validacoes from "../../utils/Validacoes";

export const obterColaboradorFactory = (token) => {
  const url = API.obterColaboradores;
  const httpServico = new HttpFetchServico(token);
  const obterColaboradores = new ObterColaboradoresHandler(url, { httpServico });
  return {
    build: () => <Colaboradores obterColaboradores={obterColaboradores} deletarColaborador={deletarColaboradorFactory(httpServico).build()} />,
  };
};

export const deletarColaboradorFactory = (httpServico) => {
  const url = API.deletarColaborador;
  const validacoes = new Validacoes();
  const deletarColaboradores = new DeletarColaboradorHandler(url, { httpServico }, validacoes);
  return {
    build: () => deletarColaboradores,
  };
};
