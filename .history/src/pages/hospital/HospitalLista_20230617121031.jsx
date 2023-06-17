import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HospitalService from '../../services/HospitalService'
import { FaPlus } from 'react-icons/fa'
import { BsPencilFill, BsTrash, BsBuilding } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { Menu } from '../../components/Menu'

import apiProjeto from '../../services/apiProjeto'

const HospitalLista = () => {

  const [hospital, setHospital] = useState([])

    useEffect(() => {
      async function getHospitais() {
        const response = await apiProjeto.get('/hospitais')
        setHospital(response.data)
      }
      getHospitais()
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
            HospitalService.delete(id)
            setHospital(HospitalService.getAll())
        }
      })
  }

    return (
        <div>
            <Menu />
            <h1 className='d-flex align-items-center justify-content-center mt-3'><BsBuilding></BsBuilding> LISTA DE HOSPITAIS</h1>

            <Link className="btn btn-primary" to={'/hospital'}><FaPlus />
                Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome do Hospital</th>
                        <th>CNPJ</th>
                        <th>Telefone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {hospital.map((item, i) => (
                        <tr key={i}>

                            <td>{item.nome}</td>
                            <td>{item.cnpj}</td>
                            <td>{item.telefone}</td>
                            <td>{item.email}</td>
                            <td>
                                <Link to={'/hospital/' + i}><BsPencilFill /></Link>{' '}
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

export default HospitalLista