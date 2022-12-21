import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import '../css/profile.css';

class Profile extends Component {
  state = {
    name: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const gotUser = await getUser();
    this.setState({
      name: gotUser.name,
      email: gotUser.email,
      description: gotUser.description,
      isLoading: false,
    });
  }

  render() {
    const { name, email, description, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <img
              src="url-to-image"
              alt={ name }
              data-testid="profile-image"
              id="profile-image"
            />
            <p data-testid="profile-name" id="profile-name">
              Nome
              {' '}
              {name}
            </p>
            <p id="profile-email">
              E-mail
              {' '}
              {email}
            </p>
            <p id="profile-description">
              Descrição
              {' '}
              {description}
            </p>
            <Link to="/profile/edit" id="edit-profile-link">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
