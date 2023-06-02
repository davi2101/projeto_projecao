class ServicoService{

    getAll(){
        const servicos = localStorage.getItem('servicos')
        return servicos ? JSON.parse(servicos) : []
    }

    get(id){
        const servicos = this.getAll()
        return servicos[id]
    }

    create(dados){
        const servicos = this.getAll()
        servicos.push(dados)
        localStorage.setItem('servicos', JSON.stringify(servicos))
    }

    update(id, dados){
        const servicos = this.getAll()
        servicos.splice(id, 1, dados)
        localStorage.setItem('servicos', JSON.stringify(servicos))
    }

    delete(id){
        const servicos = this.getAll()
        servicos.splice(id, 1)
        localStorage.setItem('servicos', JSON.stringify(servicos))
    }
}

export default new ServicoService()