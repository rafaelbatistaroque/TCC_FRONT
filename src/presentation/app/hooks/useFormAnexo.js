import React from "react";

const useFormAnexo = () => {
    const [valor, setValor] = React.useState(null);

    const onChange = async ({ target }) => {
        if (target.files && target.files.length > 0)
            setValor(target.files[0]);
    };

    return {
        valor,
        setValor,
        onChange,
    };
};

export default useFormAnexo;
