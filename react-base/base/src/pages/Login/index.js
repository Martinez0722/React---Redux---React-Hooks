import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Title, Paragraph } from './styled';

import axios from '../../services/axios';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch({
      type: 'BOTÃO CLICADO',
    });
  }
  return (
    <Container>
      <Title>
        Login
        <small>salut</small>
      </Title>
      <Paragraph>Lorem</Paragraph>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
