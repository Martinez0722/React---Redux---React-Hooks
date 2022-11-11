import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';

export default function Register() {
    const id = useSelector((state) => console.log(state.auth.user.id));
    const nomeStored = useSelector((state) =>
        console.log(state.auth.user.nome)
    );
    const emailStored = useSelector((state) =>
        console.log(state.auth.user.email)
    );

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        setNome(nomeStored);
        setEmail(emailStored);
    }, [emailStored, id, nomeStored]);

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
        if (!id && (password.length < 6 || password.length > 50)) {
            formErrors = true;
            toast.error('A senha deve ter entre 6 e 50 caractéres');
        }
        if (formErrors) return;
        setIsLoading(true);
        try {
            const response = await axios.post('/users', {
                nome,
                password,
                email,
            });
            toast.success('Você fez seu cadastro !');
            setIsLoading(false);
            history.push('/login');
            console.log(response.data);
        } catch (err) {
            const errors = get(err, 'response.data.errors', []);
            errors.map((error) => toast.error(error));
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>
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
                <button type="submit">Salvar</button>
            </Form>
        </Container>
    );
}
