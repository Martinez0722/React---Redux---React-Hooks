import React from 'react';
import history from '../../services/history';

export default function Page404() {
  history.push('/');
  return <h1>Essa página não existe</h1>;
}
