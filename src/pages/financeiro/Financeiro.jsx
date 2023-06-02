import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FinanceiroService from '../../services/FinanceiroService'
import HospitalService from '../../services/HospitalService'
import financeiroValidator from '../../validators/financeiroValidator'
import { BsCashCoin, BsSearch } from 'react-icons/bs'
import { Carousel } from 'react-bootstrap'
import { mask } from 'remask'


export const Financeiros = () => {

  const params = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, formState: { errors }} = useForm();
    const hospital = HospitalService.getAll()

    useEffect(() => {
        if (params.id) {
          const financeiro = FinanceiroService.get(params.id)
    
          for (let campo in financeiro) {
            setValue(campo, financeiro[campo])
          }
        }
      }, [])

      function salvar(dados) {

        if (params.id) {
          FinanceiroService.update(params.id, dados)
        } else {
          FinanceiroService.create(dados)
        }
    
        navigate('/financeiro/lista')
      }

      function handleChange(event){
          const mascara = event.target.getAttribute('mask')
          setValue(event.target.name, mask(event.target.value, mascara))
      }  

  return (
    <div>



      <h1 className='d-flex align-items-center justify-content-center mt-3'><BsCashCoin></BsCashCoin> FINANCEIRO</h1>

      

      <Carousel>
        <Carousel.Item width="50">
          <img
            className="d-block w-100"
            src="https://zagblogmedia.s3.amazonaws.com/wp-content/uploads/2018/06/10140220/investimento-TI-1024x682-750x400.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item width="50">
          <img
            className="d-block w-100"
            src="https://i6tecnologia.blob.core.windows.net/arquivos/postagens/c-168-sf1.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>

      <br></br>
      <Form>
        <Form.Group className="m-3" controlId="hospital">
          <Form.Label></Form.Label>
          <Form.Select {...register("hospital", financeiroValidator.hospital)}>
            <option>-SELECIONE-</option>
            {hospital.map((item, i) => (
              <option key={i} value={item.nome}>{item.nome}</option>
            ))}
          </Form.Select>
          {errors.hospital && <span>Campo Obrigatório</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="nota">
          <Form.Label>  </Form.Label>
          <Form.Control isInvalid={errors.nota} placeholder="Nº DA NOTA" type="number" {...register("nota", financeiroValidator.nota)} />
          {errors.nota && <span>{errors.nota.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="emissao">
          <Form.Label> </Form.Label>
          <Form.Control 
          isInvalid={errors.emissao} 
          placeholder="DATA DE EMISSÃO"
          type="text" 
          {...register("emissao", financeiroValidator.emissao)}
          mask="99/99/9999" onChange={handleChange}
           />
          {errors.emissao && <span>{errors.emissao.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="valor">
          <Form.Label></Form.Label>
          <Form.Control 
          isInvalid={errors.valor} 
          placeholder="VALOR DA NOTA" 
          type="text" 
          {...register("valor", financeiroValidator.valor)} 
          mask="999,99" onChange={handleChange}
          />
          {errors.valor && <span>{errors.valor.message}</span>}
        </Form.Group>

        <div className='text-right'>
        <Link className='btn btn-dark' to={'/financeiro/lista'}><BsSearch />Pesquisar</Link>
        </div>

        <div className='text-center'>
          <Button onClick={handleSubmit(salvar)} className='btn btn-success'><FaCheck /> Salvar</Button>{''}
          <Link className='btn btn-danger' to={-1}>Voltar</Link>
        </div>
      </Form>

    </div>
  )
}

export default Financeiros