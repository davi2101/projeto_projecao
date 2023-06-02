import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PacienteService from '../../services/PacienteService'
import { FaPlus } from 'react-icons/fa'
import { BsPencilFill, BsTrash, BsFillPersonFill } from 'react-icons/bs'
import Swal from 'sweetalert2'

const PacienteLista = () => {

    const [pacientes, setPacientes] = useState([])

    useEffect(() => {

        setPacientes(PacienteService.getAll())

    }, [])

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
            <h1 className='d-flex align-items-center justify-content-center mt-3'><BsFillPersonFill></BsFillPersonFill> LISTA DE PACIENTES </h1>

            <Link className="btn btn-primary" to={'/paciente'}><FaPlus />
                Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome do Paciente</th>
                        <th>CPF</th>
                        <th>Data de Nascimento</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map((item, i) => (
                        <tr key={i}>
                            
                            <td>{item.nome}</td>
                            <td>{item.cpf}</td>
                            <td>{item.datanascimento}</td>
                            <td>{item.status}</td>
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