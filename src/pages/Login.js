import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/login.css';
import logo from '../assets/logo.png';

class Login extends Component {
  state = {
    user: '',
    isDisabled: true,
    isLoading: false,
    isRedirecting: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const MIN_LENGTH = 3;
    this.setState({
      [name]: value,
    }, () => {
      const { user } = this.state;
      if (user.length >= MIN_LENGTH) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  };

  handleButton = async () => {
    const { user } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: user });
    this.setState({ isRedirecting: true });
  };

  render() {
    const { user, isDisabled, isLoading, isRedirecting } = this.state;
    return (
      <Route exact path="/">
        {isLoading ? <Loading /> : (
          <div data-testid="page-login" id="login-container">
            <img src={ logo } alt="logo" id="login-logo" />
            <input
              name="user"
              type="text"
              value={ user }
              onChange={ this.handleChange }
              data-testid="login-name-input"
              placeholder="Qual o seu nome?"
              id="input-login"
            />
            <button
              id="login-button"
              type="button"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.handleButton }
            >
              Entrar
            </button>
          </div>
        )}
        {isRedirecting && <Redirect to="/search" />}
      </Route>
    );
  }
}

export default Login;
