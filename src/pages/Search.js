import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../css/search.css';

class Search extends Component {
  state = {
    inputSearch: '',
    isDisabled: true,
    isLoading: false,
    hidden: false,
    foundSearch: false,
    albums: [],
    artistSearched: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const MIN_LENGTH = 2;
    this.setState({
      [name]: value,
      artistSearched: value,
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

  handleButton = async () => {
    const { inputSearch } = this.state;
    this.setState({ isLoading: true });
    const albums = await searchAlbumsAPI(inputSearch);
    this.setState({ isLoading: false, foundSearch: true });
    this.setState({ inputSearch: '', albums });
  };

  render() {
    const {
      inputSearch,
      isDisabled,
      isLoading,
      hidden,
      foundSearch,
      albums,
      artistSearched,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading /> : (
          <form>
            <label htmlFor="search">
              <input
                id="search"
                name="inputSearch"
                data-testid="search-artist-input"
                value={ inputSearch }
                onChange={ this.handleChange }
                hidden={ hidden }
              />
            </label>
            <button
              id="button-search"
              type="button"
              data-testid="search-artist-button"
              disabled={ isDisabled }
              onClick={ this.handleButton }
              hidden={ hidden }
            >
              Pesquisar
            </button>
            {foundSearch && (
              <div>
                <p>
                  Resultado de álbuns de:
                  {' '}
                  { artistSearched }
                </p>
                <div>
                  {(albums.length > 0) ? (albums.map((e) => (
                    <Link
                      key={ e.collectionId }
                      to={ `/album/${e.collectionId}` }
                      data-testid={ `link-to-album-${e.collectionId}` }
                    >
                      <ul>
                        <li>
                          <img
                            src={ e.artworkUrl100 }
                            alt={ e.collectionName }
                            className="album-img"
                          />
                        </li>
                        <li>
                          <p className="collection-name">{e.collectionName}</p>
                        </li>
                        <li>
                          <p className="artist-name">{e.artistName}</p>
                        </li>
                      </ul>
                    </Link>
                  ))) : <p>Nenhum álbum foi encontrado</p> }
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    );
  }
}

export default Search;
