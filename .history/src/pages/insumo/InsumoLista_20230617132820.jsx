import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import InsumoService from '../../services/InsumoService'
import { FaPlus } from 'react-icons/fa'
import { BsPencilFill, BsTrash, BsDropletFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { Menu } from '../../components/Menu'
import apiProjeto from '../../services/apiProjeto'

const InsumosLista = () => {

    const [insumos, setInsumos] = useState([])

    useEffect(() => {
        async function getInsumo(){
            const response = apiProjeto.get('/insumos');
            setInsumos((await response).data)
        }
        getInsumo()
    }, [insumos])

    function apagar(id) {
        Swal.fire({
          title: 'Deseja apagar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, apagar!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await apiProjeto.delete(`/delInsumo?id=${id}`);
              Swal.fire('Deletado!', 'Item deletado da Lista', 'success');
            } catch (error) {
              Swal.fire('Erro!', 'Ocorreu um erro ao deletar o item', 'error');
              console.error(error);
            }
          }
        });
      }

    return (
        <div>
            <Menu/>
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
                                <Link to={'/insumo/' + item.id}><BsPencilFill /></Link>{' '}
                            </td>
                                <td>
                                <BsTrash onClick={() => apagar(item.id)} className='text-danger' />
                                </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default InsumosLista