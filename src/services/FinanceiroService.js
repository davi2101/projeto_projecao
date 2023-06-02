class FinanceiroService{

    getAll(){
        const financeiros = localStorage.getItem('financeiros')
        return financeiros ? JSON.parse(financeiros) : []
    }

    get(id){
        const financeiros = this.getAll()
        return financeiros[id]
    }

    create(dados){
        const financeiros = this.getAll()
        financeiros.push(dados)
        localStorage.setItem('financeiros', JSON.stringify(financeiros))
    }

    update(id, dados){
        const financeiros = this.getAll()
        financeiros.splice(id, 1, dados)
        localStorage.setItem('financeiros', JSON.stringify(financeiros))
    }

    delete(id){
        const financeiros = this.getAll()
        financeiros.splice(id, 1)
        localStorage.setItem('financeiros', JSON.stringify(financeiros))
    }
}

export default new FinanceiroService()