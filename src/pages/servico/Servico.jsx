import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ServicoService from '../../services/ServicoService'
import servicoValidator from '../../validators/servicoValidator'
import { mask } from 'remask'
import { BsHammer, BsSearch } from 'react-icons/bs'

export const Servicos = () => {

  const params = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (params.id) {
      const servico = ServicoService.get(params.id)

      for (let campo in servico) {
        setValue(campo, servico[campo])
      }
    }
  }, [])

  function salvar(dados) {

    if (params.id) {
        ServicoService.update(params.id, dados)
    } else {
        ServicoService.create(dados)
    }

    navigate('/servico/lista')
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask')
    setValue(event.target.name, mask(event.target.value, mascara))
  }
  return (
    <div>
      <h1 className='d-flex align-items-center justify-content-center mt-3'><BsHammer></BsHammer> SERVIÇO </h1>

      <Form>
        <Form.Group className="m-3" controlId="servico">
          <Form.Label> TIPO DE SERVIÇO: </Form.Label>
          <Form.Control isInvalid={errors.servico} type="text" {...register("servico", servicoValidator.servico)} />
          {errors.servico && <span>{errors.servico.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="cargahora">
          <Form.Label> CARGA HORÁRIA: </Form.Label>
          <Form.Control
            isInvalid={errors.cargahora} type="text"
            {...register("cargahora", servicoValidator.cargahora)}
            mask="99:99" onChange={handleChange}
          />
          {errors.cargahora && <span>{errors.cargahora.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="setor">
          <Form.Label> SETOR: </Form.Label>
          <Form.Control isInvalid={errors.setor} type="text" {...register("setor", servicoValidator.setor)} />
          {errors.setor && <span>{errors.setor.message}</span>}
        </Form.Group>

        <div className='text-right'>
          <Link className='btn btn-dark' to={'/servico/lista'}><BsSearch />Pesquisar</Link>
        </div>

        <div className='text-center'>
          <Button onClick={handleSubmit(salvar)} className='btn btn-success'><FaCheck /> Salvar</Button>{''}
          <Link className='btn btn-danger' to={-1}><BsArrowLeft /> Voltar</Link>
        </div>
      </Form>
    </div>
  )
}

export default Servicos