const pacienteValidator = {
    nome: {
        required: "O Nome é Obrigatório",
        minLength: {
            value: 3,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 20,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    cpf: {
        minLength: {
            value: 14,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 14,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    datanascimento: {
        minLength: {
            value: 8,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 11,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    status: {
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

export default pacienteValidator