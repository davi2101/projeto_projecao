class HospitaisService{

    getAll(){
        const hospitais = localStorage.getItem('hospitais')
        return hospitais ? JSON.parse(hospitais) : []
    }

    get(id){
        const hospitais = this.getAll()
        return hospitais[id]
    }

    create(dados){
        const hospitais = this.getAll()
        hospitais.push(dados)
        localStorage.setItem('hospitais', JSON.stringify(hospitais))
    }

    update(id, dados){
        const hospitais = this.getAll()
        hospitais.splice(id, 1, dados)
        localStorage.setItem('hospitais', JSON.stringify(hospitais))
    }

    delete(id){
        const hospitais = this.getAll()
        hospitais.splice(id, 1)
        localStorage.setItem('hospitais', JSON.stringify(hospitais))
    }
}

export default new HospitaisService()