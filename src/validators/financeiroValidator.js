const financeiroValidator = {
    instituicao: {
        maxLength: {
            value: 50,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    nota: {
        required: "O Nº da Nota é Obrigatório",
        minLength: {
            value: 3,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 5,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    emissao: {
        required: "A data de Emissão é Obrigatório",
        minLength: {
            value: 2,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 12,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    valor: {
        maxLength: {
            value: 50,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    }
}

export default financeiroValidator