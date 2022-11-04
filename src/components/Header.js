import React, { Component } from 'react';
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
          <p
            data-testid="header-user-name"
          >
            Olá,
            {' '}
            { user }
          </p>
        )}
      </header>
    );
  }
}

export default Header;
