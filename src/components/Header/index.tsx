import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';
import { FiBarChart } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import logo from '../../assets/logo.png';
const Header: React.FC = () => {
  const { signOut } = useAuth();


  return (
    <Container >
      <header>
        <img src={logo} alt="Logo" />
        <nav>
          <Link to="/trees">Árvores</Link>
          <Link to="/species">Espécies</Link>
          <Link to="/trees-groups">Grupo de árvores</Link>
          <Link to="/harvest">Colheita</Link>
          <Link to="/" onClick={() => signOut()}>Sair</Link>
        </nav>
      </header>
    </Container>
  )
}
export default Header;
