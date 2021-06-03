import React from "react";

const useForm = (estadoInicial = "") => {
    const [valor, setValor] = React.useState(estadoInicial);

    const onChange = ({ target }) => {
        setValor(target.value);
    };

    return {
        valor,
        setValor,
        onChange,
    };
};

export default useForm;
