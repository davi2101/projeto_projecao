import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import hospitalValidator from '../../validators/hospitalValidator'
import { mask } from 'remask'
import { BsBuilding, BsSearch } from 'react-icons/bs'
import { Menu } from '../../components/Menu'
import apiProjeto from '../../services/apiProjeto'
import { toast } from 'react-toastify'

export const Hospitals = () => {
  const [hospital, setHospital] = useState([]);

  const params = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    async function getPaciente() {
      if (params.id) {
        const response = await apiProjeto.get(`/idHospital/${params.id}`);
        setHospital(response.data);
      }
    }
    getPaciente();
  }, [params.id]);

  useEffect(() => {
    for (let campo in hospital) {
      setValue(campo, hospital[campo]);
    }
  }, [hospital, setValue]);

  function salvar(dados, e) {
    e.preventDefault();
  
    if (params.id) {
      apiProjeto
        .put(`/attHospital/?id=${params.id}`, dados)
        .then(() => {
          toast.success("Dados do paciente atualizados com sucesso");
          navigate('/hospital/lista');
        })
        .catch((error) => {
          toast.error("Erro ao atualizar os dados do hospital");
          console.error(error);
        });
    } else {
      apiProjeto
        .post('/addHospital', dados)
        .then(() => {
          toast.success("Hospital cadastrado com sucesso");
          navigate('/hospital/lista');
        })
        .catch((error) => {
          toast.error("Erro ao cadastrar o hospital");
          console.error(error);
        });
    }
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute('mask')
    setValue(event.target.name, mask(event.target.value, mascara))
  }
  return (
    
    <div>
      <Menu/>
      <h1 className='d-flex align-items-center justify-content-center mt-3'><BsBuilding></BsBuilding> HOSPITAL </h1>

      <Form>
        <Form.Group className="m-3" controlId="nome">
          <Form.Label> NOME DO HOSPITAL: </Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register("nome", hospitalValidator.nome)} />
          {errors.nome && <span>{errors.nome.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="cnpj">
          <Form.Label> CNPJ: </Form.Label>
          <Form.Control
            isInvalid={errors.cnpj} type="text"
            {...register("cnpj", hospitalValidator.cnpj)}
            mask="99.999.999/9999-99" onChange={handleChange}
          />
          {errors.cnpj && <span>{errors.cnpj.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="telefone">
          <Form.Label> TELEFONE: </Form.Label>
          <Form.Control
            isInvalid={errors.telefone}
            type="text"
            {...register("telefone", hospitalValidator.telefone)}
            mask="(99) 9999-9999" onChange={handleChange}
          />
          {errors.telefone && <span>{errors.telefone.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="email">
          <Form.Label> EMAIL: </Form.Label>
          <Form.Control isInvalid={errors.email} type="text" {...register("email", hospitalValidator.email)} />
          {errors.email && <span>{errors.email.message}</span>}
        </Form.Group>

        <div className='text-right'>
          <Link className='btn btn-dark' to={'/hospital/lista'}><BsSearch /></Link>
        </div>

        <div className='text-center'>
          <Button onClick={handleSubmit(salvar)} className='btn btn-success'><FaCheck /> Salvar</Button>{''}
          <Link className='btn btn-danger' to={-1}><BsArrowLeft /> Voltar</Link>
        </div>
      </Form>
    </div>
  )
}

export default Hospitals