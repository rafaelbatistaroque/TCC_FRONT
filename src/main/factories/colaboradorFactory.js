import React from "react";
import ObterColaboradoresHandler from "../../features/business/services/ObterColaboradoresHandler";
import HttpFetchServico from "../../features/infra/http-servico/HttpFetchServico";
import Colaboradores from "../../presentation/pages/Colaboradores";
import API from "../../utils/urlApi";

const colaboradorFactory = (token) => {
  const url = API.obterColaboradores;
  const httpServico = new HttpFetchServico(token);
  const obterColaboradores = new ObterColaboradoresHandler(url, httpServico);
  return {
    build: () => <Colaboradores obterColaboradores={obterColaboradores} />,
  };
};

export default colaboradorFactory;
