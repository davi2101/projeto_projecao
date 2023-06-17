import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FinanceiroService from '../../services/FinanceiroService'
import { FaPlus } from 'react-icons/fa'
import { BsPencilFill, BsTrash, BsCashCoin } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { Menu } from '../../components/Menu'

import apiProjeto from '../../services/apiProjeto'

const FinanceiroLista = () => {

  const [financeiros, setFinanceiros] = useState([])

  useEffect(() => {
    async function getFinanceiro(){
      const response = await apiProjeto.get('/financeiros');
      setFinanceiros(response.data)
    }

  }, [financeiros])

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
              FinanceiroService.delete(id)
             setFinanceiros(FinanceiroService.getAll())
            }
          })
    }

    return (
        <div>
            <Menu/>
            <h1 className='d-flex align-items-center justify-content-center mt-3'><BsCashCoin></BsCashCoin>LISTA DE NOTAS</h1>

            <Link className="btn btn-primary" to={'/financeiro'}><FaPlus />
                Novo
            </Link>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Instituição</th>
                        <th>Nº Nota</th>
                        <th>Data de Emissão</th>
                        <th>Valor</th>

                    </tr>
                </thead>
                <tbody>
                    {financeiros.map((item, i) => (
                        <tr key={i}>
                            
                            <td>{item.instituicao}</td>
                            <td>{item.nota}</td>
                            <td>{item.emissao}</td>
                            <td>{item.valor}</td>
                            <td>
                                <Link to={'/financeiro/' + i}><BsPencilFill /></Link>{' '}
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

export default FinanceiroLista