import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        let formErrors = false;

        if (nome.length < 3 || nome.length > 255) {
            formErrors = true;
            toast.error('O nome deve ter entre 3 e 255 caractéres');
        }
        if (!isEmail(email)) {
            formErrors = true;
            toast.error('E-mail inválido');
        }
        if (password.length < 6 || password.length > 50) {
            formErrors = true;
            toast.error('A senha deve ter entre 6 e 50 caractéres');
        }
        if (formErrors) return;

        try {
            const response = await axios.post('/users', {
                nome,
                password,
                email,
            });
            toast.success('Você fez seu cadastro !');
            history.push('/login');
            console.log(response.data);
        } catch (err) {
            const errors = get(err, 'response.data.errors', []);
            errors.map((error) => toast.error(error));
        }
    }

    return (
        <Container>
            <h1>Crie sua conta</h1>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="nome">
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome"
                    ></input>
                </label>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu e-mail"
                    ></input>
                </label>
                <label htmlFor="nome">
                    Senha:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha"
                    ></input>
                </label>
                <button type="submit">Criar minha conta</button>
            </Form>
        </Container>
    );
}
