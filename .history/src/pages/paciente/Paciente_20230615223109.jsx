import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PacienteService from '../../services/PacienteService'
import pacienteValidator from '../../validators/pacienteValidator'
import { mask } from 'remask'
import { BsFillPersonFill, BsSearch } from 'react-icons/bs'
import { Menu } from '../../components/Menu'
import { toast } from 'react-toastify'

import apiProjeto from '../../services/apiProjeto'

export const Pacientes = () => {
  const [paciente, setPaciente] = useState([]);

  const params = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    async function getPaciente(){
      if (params.id) {
        const response = await apiProjeto.get(`/idPaciente/${params.id}`)
      
        setPaciente(response.data)

        for (let campo in paciente) {
          setValue(campo, paciente[campo])
        }
      }
    }
    getPaciente()
  }, [paciente, params.id, setValue])

  function salvar(dados) {

    if (params.id) {
      PacienteService.update(params.id, dados)
    } else {
      console.log(dados);
      apiProjeto.post('/addPaciente', {
        data:{
          nome: dados.nome.toString(),
          hospital: dados.hospital.toString(),
          cpf: dados.cpf.toString(),
          data_nascimento: dados.data_nascimento.toString(),
          situacao: dados.situacao.toString()
        }
      })
      .then(() => {
        toast.success("Usuário cadastrado com sucesso")
      })
    }

    navigate('/paciente/lista')
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask')
    setValue(event.target.name, mask(event.target.value, mascara))
  }
  return (
    <div>

      <Menu/>
      <h1 className='d-flex align-items-center justify-content-center mt-3'><BsFillPersonFill></BsFillPersonFill> PACIENTES </h1>

      <Form>
        <Form.Group className="m-3" controlId="nome">
          <Form.Label> NOME: </Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" 
          {...register("nome", pacienteValidator.nome)} />
          {errors.nome && <span>{errors.nome.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="hospital">
          <Form.Label> HOSPITAL: </Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" 
          {...register("hospital", pacienteValidator.hospital)} />
          {errors.hospital && <span>{errors.hospital.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="cpf">
          <Form.Label> CPF: </Form.Label>
          <Form.Control
            isInvalid={errors.cpf} type="text"
            {...register("cpf", pacienteValidator.cpf)}
            mask="999.999.999-99" onChange={handleChange}
          />
          {errors.cpf && <span>{errors.cpf.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="data_nascimento">
          <Form.Label> DATA DE NASCIMENTO: </Form.Label>
          <Form.Control
            isInvalid={errors.datanascimento}
            type="text"
            {...register("data_nascimento", pacienteValidator.datanascimento)}
            mask="99/99/9999" onChange={handleChange}
          />
          {errors.datanascimento && <span>{errors.datanascimento.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="situacao">
          <Form.Label> STATUS: </Form.Label>
          <Form.Control
            isInvalid={errors.status}
            type="text"
            {...register("situacao", pacienteValidator.status)}
            onChange={handleChange}
          />
          {errors.status && <span>{errors.status.message}</span>}
        </Form.Group>

        <div className='text-right'>
          <Link className='btn btn-dark' to={'/paciente/lista'}><BsSearch /></Link>
        </div>

        <div className='text-center'>
          <Button onClick={handleSubmit(salvar)} className='btn btn-success'><FaCheck /> Salvar</Button>{''}
          <Link className='btn btn-danger' to={-1}><BsArrowLeft /> Voltar</Link>
        </div>
      </Form>
    </div>
  )
}

export default Pacientes