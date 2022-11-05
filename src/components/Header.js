import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    user: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const name = await getUser();
    this.setState({ user: name.name, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? <Loading /> : (
          <nav>
            <p
              data-testid="header-user-name"
            >
              Olá,
              {' '}
              { user }
            </p>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
        )}
      </header>
    );
  }
}

export default Header;
