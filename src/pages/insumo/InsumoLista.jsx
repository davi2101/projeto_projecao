import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import InsumoService from '../../services/InsumoService'
import { FaPlus } from 'react-icons/fa'
import { BsPencilFill, BsTrash, BsDropletFill } from 'react-icons/bs'
import Swal from 'sweetalert2'

const InsumosLista = () => {

    const [insumos, setInsumos] = useState([])

    useEffect(() => {

        setInsumos(InsumoService.getAll())

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
              InsumoService.delete(id)
             setInsumos(InsumoService.getAll())
            }
          })
    }

    return (
        <div>
            <h1 className='d-flex align-items-center justify-content-center mt-3'><BsDropletFill></BsDropletFill> LISTA DOS INSUMOS</h1>

            <Link className="btn btn-primary" to={'/insumo'}><FaPlus />
                Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Volume</th>
                        <th>Lote</th>

                    </tr>
                </thead>
                <tbody>
                    {insumos.map((item, i) => (
                        <tr key={i}>
                            
                            <td>{item.nome}</td>
                            <td>{item.volume}</td>
                            <td>{item.lote}</td>
                            <td>
                                <Link to={'/insumo/' + i}><BsPencilFill /></Link>{' '}
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

export default InsumosLista