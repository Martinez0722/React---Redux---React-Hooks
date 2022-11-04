import React, { useEffect } from 'react';

import { Container } from '../../styles/GlobalStyles';
import { Title, Paragraph } from './styled';

import axios from '../../services/axios';

export default function Login() {
  return (
    <Container>
      <Title>
        Login
        <small>salut</small>
      </Title>
      <Paragraph>Lorem</Paragraph>
      <button type="button">Enviar</button>
    </Container>
  );
}
