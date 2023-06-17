import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import InsumoService from '../../services/InsumoService'
import insumoValidator from '../../validators/insumoValidator'
import { BsDropletFill, BsSearch } from 'react-icons/bs'
import { mask } from 'remask'
import { Menu } from '../../components/Menu'
import apiProjeto from '../../services/apiProjeto'
import { toast } from 'react-toastify'

export const Insumos = () => {
  const [insumos, setInsumos] = useState([])

  const params = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    async function getPaciente() {
      if (params.id) {
        const response = await apiProjeto.get(`/idInsumo/${params.id}`);
        setInsumos(response.data);
      }
    }
    getPaciente();
  }, [params.id]);

  useEffect(() => {
    for (let campo in insumos) {
      setValue(campo, insumos[campo]);
    }
  }, [insumos, setValue]);

  function salvar(dados) {

    if (params.id) {
      InsumoService.update(params.id, dados)
    } 
    else {
      InsumoService.create(dados)
    }

    navigate('/insumo/lista')
  }

  function handleChange(event){
    const mascara = event.target.getAttribute('mask')
    setValue(event.target.name, mask(event.target.value, mascara))
}  

  return (

    <div>
      <Menu/>
      <h1 className='d-flex align-items-center justify-content-center mt-3'><BsDropletFill></BsDropletFill> INSUMOS</h1>

      <Form>
        <Form.Group className="m-3" controlId="nome">
          <Form.Label></Form.Label>
          <Form.Control isInvalid={errors.nome} placeholder="NOME DO PRODUTO" type="text" {...register("nome", insumoValidator.nome)} />
          {errors.nome && <span>{errors.nome.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="volume">
          <Form.Label></Form.Label>
          <Form.Control 
          isInvalid={errors.volume} 
          placeholder="VOLUME (mL)" 
          type="text" 
          {...register("volume", insumoValidator.volume)} 
          mask="999 mL" onChange={handleChange}
          />
          {errors.volume && <span>{errors.volume.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="lote">
          <Form.Label> </Form.Label>
          <Form.Control isInvalid={errors.lote} placeholder="LOTE" type="number" {...register("lote", insumoValidator.lote)} />
          {errors.lote && <span>{errors.lote.message}</span>}
        </Form.Group>

        <div className='text-right'>
        <Link className='btn btn-dark' to={'/insumo/lista'}><BsSearch /></Link>
        </div>

        <div className='text-center'>
      <Button onClick={handleSubmit(salvar)} className='btn btn-success'><FaCheck /> Salvar</Button>{''}
          <Link className='btn btn-danger' to={-1}><BsArrowLeft /> Voltar</Link>
        </div>
      </Form>
    </div>
  )
}

export default Insumos