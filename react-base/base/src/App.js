import React from 'react';
import Login from './pages/Login';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Login />
        <GlobalStyles />
      </BrowserRouter>
    </>
  );
}

export default App;
