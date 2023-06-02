const servicoValidator = {
    servico: {
        required: "O Serviço é Obrigatório",
        minLength: {
            value: 3,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 50,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    cargahora: {
        minLength: {
            value: 5,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 5,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    setor: {
        minLength: {
            value: 2,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 11,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    satisfacao: {
        minLength: {
            value: 3,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 50,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    }
    
}

export default servicoValidator