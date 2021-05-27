import React from "react";
import ObterColaboradoresHandler from "../../features/autenticacao/business/services/ObterColaboradoresHandler";
import HttpFetchServico from "../../features/autenticacao/infra/http-servico/HttpFetchServico";
import Colaboradores from "../../presentation/pages/Colaboradores";
import API from "../../utils/urlApi";

const colaboradorFactory = (ehAutenticado) => {
  const url = API.obterColaboradores;
  const httpServico = new HttpFetchServico(ehAutenticado);
  const obterColaboradores = new ObterColaboradoresHandler(url, httpServico);
  return {
    build: () => <Colaboradores obterColaboradores={obterColaboradores} />,
  };
};

export default colaboradorFactory;
