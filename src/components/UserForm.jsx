import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
`;

const InputField = styled(Field)`
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`;
const Buttons = styled.div`
width:100%;
display:flex;
justify-content: space-around;`





const CadastroForm = () => {
  const initialValues = {
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    login: '',
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório').max(200, 'Máximo de 200 caracteres'),
    email: Yup.string().required('Campo obrigatório').email('E-mail inválido').max(100, 'Máximo de 100 caracteres'),
    senha: Yup.string().required('Campo obrigatório').min(8, 'Mínimo de 8 caracteres'),
    cpf: Yup.string().required('Campo obrigatório').matches(/^\d{11}$/, 'CPF inválido'),
    login: Yup.string()
      .required('Campo obrigatório')
      .test('cpf-match', 'O login deve ser igual ao CPF', function (value) {
        return value === this.parent.cpf;
      }),
  });
 
  const createUser = async (name, email, password, cpf) => {
    try {
        const response = await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, cpf
               }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was an error creating the user:", error);
    }
};

  const handleSubmit = (values) => {
   createUser(values.nome, values.email, values.password,values.cpf)
    
     
  };

  const handleVerLista = (values) => {
    window.location.href = '/lista';
 
  };

  return (
    <Container>
    <Title>Cadastro de Usuário</Title>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <FormGroup>
          <Label htmlFor="nome">Nome:</Label>
          <InputField type="text" id="nome" name="nome" />
          <ErrorMessageStyled name="nome" component="div" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <InputField type="text" id="email" name="email" />
          <ErrorMessageStyled name="email" component="div" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="senha">Senha:</Label>
          <InputField type="password" id="senha" name="senha" />
          <ErrorMessageStyled name="senha" component="div" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="cpf">CPF:</Label>
          <InputField type="text" id="cpf" name="cpf" />
          <ErrorMessageStyled name="cpf" component="div" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="login">Login:</Label>
          <InputField type="text" id="login" name="login" />
          <ErrorMessageStyled name="login" component="div" />
        </FormGroup>

       <Buttons> <SubmitButton type="submit">Cadastrar</SubmitButton> 
        <SubmitButton type="submit" onClick={handleVerLista}>Ver Lista</SubmitButton>
        </Buttons>
     
      </Form>
    </Formik>
  </Container>
  );
};

export default CadastroForm;

