import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import financeiroValidator from '../../validators/financeiroValidator'
import { BsCashCoin, BsSearch } from 'react-icons/bs'
import { mask } from 'remask'
import { Menu } from '../../components/Menu'
import apiProjeto from '../../services/apiProjeto'
import { toast } from 'react-toastify'


export const Financeiros = () => {
  const [financeiro, setFinanceiro] = useState([])

  const params = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, formState: { errors }} = useForm();

    useEffect(() => {
      async function getFinanceiro() {
        if (params.id) {
          const response = await apiProjeto.get(`/idFinanceiro/${params.id}`);
          setFinanceiro(response.data);
        }
      }
      getFinanceiro();
    }, [params.id]);

    useEffect(() => {
      for (let campo in financeiro) {
        setValue(campo, financeiro[campo]);
      }
    }, [financeiro, setValue]);

    function salvar(dados, e) {
      e.preventDefault();
    
      if (params.id) {
        apiProjeto
          .put(`/attFinanceiro/?id=${params.id}`, dados)
          .then(() => {
            toast.success("Dados atualizados com sucesso");
            navigate('/hospital/lista');
          })
          .catch((error) => {
            toast.error("Erro ao atualizar os dados!!");
            console.error(error);
          });
      } else {
        apiProjeto
          .post('/addHospital', dados)
          .then(() => {
            toast.success("Finança cadastrada com sucesso");
            navigate('/financeiro/lista');
          })
          .catch((error) => {
            toast.error("Erro ao cadastrar finança");
            console.error(error);
          });
      }
    }

    unction handleChange(event) {
      const mascara = event.target.getAttribute('mask')
      setValue(event.target.name, mask(event.target.value, mascara))
    }

  return (
    <div>

      <Menu/>

      <h1 className='d-flex align-items-center justify-content-center mt-3'><BsCashCoin></BsCashCoin> FINANCEIRO</h1>

      

      <br></br>
      <Form>
        <Form.Group className="m-3" controlId="instituicao">
          <Form.Label>  </Form.Label>
          <Form.Control isInvalid={errors.instituicao} placeholder="NOME DO HOSPITAL" type="text" 
          {...register("instituicao", financeiroValidator.instituicao)} 
          />
          {errors.instituicao && <span>{errors.instituicao.message}</span>}
        </Form.Group>

        <Form.Group className="m-3" controlId="nota">
          <Form.Label>  </Form.Label>
          <Form.Control isInvalid={errors.nota} placeholder="Nº DA NOTA" type="number" 
          {...register("nota", financeiroValidator.nota)} 
          />
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
        <Link className='btn btn-dark' to={'/financeiro/lista'}><BsSearch /></Link>
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