import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    inputSearch: '',
    isDisabled: true,
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    const MIN_LENGTH = 2;
    this.setState({
      [name]: value,
    }, () => {
      const { inputSearch } = this.state;
      if (inputSearch.length >= MIN_LENGTH) {
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

  // onButtonClick = () => {};

  render() {
    const { inputSearch, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              id="search"
              name="inputSearch"
              data-testid="search-artist-input"
              value={ inputSearch }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            // onClick={ this.onButtonClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
