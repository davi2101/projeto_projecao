const insumoValidator = {
    nome: {
        required: "O Nome do Produto é Obrigatório",
        minLength: {
            value: 3,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 50,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    volume: {
        minLength: {
            value: 2,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 11,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    },
    lote: {
        required: "O Lote é Obrigatório",
        minLength: {
            value: 1,
            message: "Quantidade mínima de caracteres não informado"
        },
        maxLength: {
            value: 11,
            message: "Quantidade máxima de caracteres ultrapassada"
        },
    }
}

export default insumoValidator