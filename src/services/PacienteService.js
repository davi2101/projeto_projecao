class PacienteService{

    getAll(){
        const pacientes = localStorage.getItem('pacientes')
        return pacientes ? JSON.parse(pacientes) : []
    }

    get(id){
        const pacientes = this.getAll()
        return pacientes[id]
    }

    create(dados){
        const pacientes = this.getAll()
        pacientes.push(dados)
        localStorage.setItem('pacientes', JSON.stringify(pacientes))
    }

    update(id, dados){
        const pacientes = this.getAll()
        pacientes.splice(id, 1, dados)
        localStorage.setItem('pacientes', JSON.stringify(pacientes))
    }

    delete(id){
        const pacientes = this.getAll()
        pacientes.splice(id, 1)
        localStorage.setItem('pacientes', JSON.stringify(pacientes))
    }
}

export default new PacienteService()