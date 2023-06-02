import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ServicoService from '../../services/ServicoService'
import { FaPlus } from 'react-icons/fa'
import { BsPencilFill, BsTrash, BsHammer } from 'react-icons/bs'
import Swal from 'sweetalert2'

const ServicoLista = () => {

    const [servico, setServico] = useState([])

    useEffect(() => {

        setServico(ServicoService.getAll())

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
              ServicoService.delete(id)
             setServico(ServicoService.getAll())
            }
          })
    }

    return (
        <div>
            <h1 className='d-flex align-items-center justify-content-center mt-3'><BsHammer></BsHammer> LISTA DE SERVIÇOS </h1>

            <Link className="btn btn-primary" to={'/servico'}><FaPlus />
                Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Carga Horária</th>
                        <th>Setor</th>
                    </tr>
                </thead>
                <tbody>
                    {servico.map((item, i) => (
                        <tr key={i}>
                            
                            <td>{item.servico}</td>
                            <td>{item.cargahora}</td>
                            <td>{item.setor}</td>
                            <td>
                                <Link to={'/servico/' + i}><BsPencilFill /></Link>{' '}
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

export default ServicoLista