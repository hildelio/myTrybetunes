import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../css/header.css';
import logo from '../assets/logo.png';

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
      <header data-testid="header-component" id="header-container">
        {isLoading ? <Loading /> : (
          <nav>
            <img src={ logo } alt="logo" id="header-logo" />
            <p
              data-testid="header-user-name"
              id="user-name"
            >
              Olá,
              {' '}
              { user }
            </p>
            <Link
              to="/search"
              data-testid="link-to-search"
              id="search-link"
            >
              Pesquisar

            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              id="favorites-link"
            >
              Músicas Favoritas

            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              id="profile-link"
            >
              Perfil

            </Link>
          </nav>
        )}
      </header>
    );
  }
}

export default Header;
