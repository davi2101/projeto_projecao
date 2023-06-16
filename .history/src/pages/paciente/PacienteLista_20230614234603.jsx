import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PacienteService from '../../services/PacienteService'
import { FaPlus } from 'react-icons/fa'
import { BsPencilFill, BsTrash, BsFillPersonFill, BsFilePdfFill} from 'react-icons/bs'
import Swal from 'sweetalert2'
import { Menu } from '../../components/Menu'
import pacientesPDF from '../../reports/pacientes/pacientes'

import apiProjeto from '../../services/apiProjeto'

const PacienteLista = () => {
  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    async function getPacientes(){
          const response = await apiProjeto.get('/pacientes')
          setPacientes(response.data);
  
    getPacientes()
  }, [pacientes])

  function apagar(id) {
      Swal.fire({
          title: 'Deseja apagar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, apagar!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deletado!',
              'Item deletado da Lista',
              'success'
            )
            PacienteService.delete(id)
            setPacientes(PacienteService.getAll())
          }
        })
  }

  return (
      <div>
          <Menu/>
          <h1 className='d-flex align-items-center justify-content-center mt-3'><BsFillPersonFill></BsFillPersonFill> LISTA DE PACIENTES </h1>

          <Link className="btn btn-primary" to={'/paciente'}><FaPlus /> Novo </Link>

          <button onClick={(e) => pacientesPDF(pacientes)} className="btn btn-danger" type="button" id="button-addon2"><BsFilePdfFill/> Gerar Relatório </button>

          <Table striped bordered hover>
              <thead>
                  <tr>
                      <th>Nome do Paciente</th>
                      <th>Hospital</th>
                      <th>CPF</th>
                      <th>Data de Nascimento</th>
                      <th>Status</th>
                  </tr>
              </thead>
              <tbody>
                  {pacientes.map((item, i) => (
                      <tr key={i}>
                          
                          <td>{item.nome}</td>
                          <td>{item.hospital}</td>
                          <td>{item.cpf}</td>
                          <td>{item.data_nascimento}</td>
                          <td>{item.situacao}</td>
                          <td>
                              <Link to={'/paciente/' + i}><BsPencilFill /></Link>{' '}
                          </td>
                              <td>
                              <BsTrash onClick={() => apagar(i)} className='text-danger' />
                              </td>
                      </tr>
                  ))}
              </tbody>
          </Table>
      </div>
  )
}

export default PacienteLista