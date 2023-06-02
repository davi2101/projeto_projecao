import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PacienteService from '../../services/PacienteService'
import pacienteValidator from '../../validators/pacienteValidator'
import { mask } from 'remask'
import { BsFillPersonFill, BsSearch } from 'react-icons/bs'

export const Pacientes = () => {

  const params = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (params.id) {
      const paciente = PacienteService.get(params.id)

      for (let campo in paciente) {
        setValue(campo, paciente[campo])
      }
    }
  }, [])

  function salvar(dados) {

    if (params.id) {
      PacienteService.update(params.id, dados)
    } else {
      PacienteService.create(dados)
    }

    navigate('/paciente/lista')
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask')
    setValue(event.target.name, mask(event.target.value, mascara))
  }
  return (
    <div>
      <h1 className='d-flex align-items-center justify-content-center mt-3'><BsFillPersonFill></BsFillPersonFill> PACIENTES </h1>

      <Form>
        <Form.Group className="m-3" controlId="nome">
          <Form.Label> NOME: </Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register("nome", pacienteValidator.nome)} />
          {errors.nome && <span>{errors.nome.message}</span>}
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

        <Form.Group className="m-3" controlId="datanascimento">
          <Form.Label> DATA DE NASCIMENTO: </Form.Label>
          <Form.Control
            isInvalid={errors.datanascimento}
            type="text"
            {...register("datanascimento", pacienteValidator.datanascimento)}
            mask="99/99/9999" onChange={handleChange}
          />
          {errors.datanascimento && <span>{errors.datanascimento.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="status">
          <Form.Label> STATUS: </Form.Label>
          <Form.Select aria-label="Default select example">
            <option>-SELECIONE-</option>
            <option value="1">Em Tratamento</option>
            <option value="2">Alta</option>
            <option value="3">Óbito</option>
            <option value="4">Suspenso</option>
          </Form.Select>
        </Form.Group>

        <div className='text-right'>
          <Link className='btn btn-dark' to={'/paciente/lista'}><BsSearch />Pesquisar</Link>
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