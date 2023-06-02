const hospitalValidator = {
    nome: {
        required: "O Nome do Hospital é Obrigatório",
        maxLength: {
            value: 50,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    cnpj: {
        required: "O CNPJ é Obrigatório",
        minLength: {
            value: 18,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 18,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    telefone: {
        minLength: {
            value: 13,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 14,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    email: {
        minLength: {
            value: 5,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 50,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    }
}

export default hospitalValidator