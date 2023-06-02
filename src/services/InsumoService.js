class InsumoService{

    getAll(){
        const insumos = localStorage.getItem('insumos')
        return insumos ? JSON.parse(insumos) : []
    }

    get(id){
        const insumos = this.getAll()
        return insumos[id]
    }

    create(dados){
        const insumos = this.getAll()
        insumos.push(dados)
        localStorage.setItem('insumos', JSON.stringify(insumos))
    }

    update(id, dados){
        const insumos = this.getAll()
        insumos.splice(id, 1, dados)
        localStorage.setItem('insumos', JSON.stringify(insumos))
    }

    delete(id){
        const insumos = this.getAll()
        insumos.splice(id, 1)
        localStorage.setItem('insumos', JSON.stringify(insumos))
    }
}

export default new InsumoService()