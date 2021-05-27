import React from "react";
import { BrowserRouter } from "react-router-dom";
import colaboradorFactory from "../main/factories/colaboradorFactory";
import loginFactory from "../main/factories/loginFactory";
import { PerfilContext } from "./hooks/perfilContext";
import Rotas from "./Rotas";

const App = () => {
  const { ehAutenticado } = React.useContext(PerfilContext);
  return (
    <BrowserRouter>
      <Rotas
        login={loginFactory().build()}
        colaborador={colaboradorFactory(ehAutenticado).build()}
      />
    </BrowserRouter>
  );
};

export default App;
