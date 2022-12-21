import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    isLoading: false,
    isChecked: '',
  };

  async componentDidMount() {
    const { trackId } = this.props;
    this.setState({ isLoading: true });
    const favoritesSongs = await getFavoriteSongs();
    const favorites = favoritesSongs.some(((e) => e.trackId === trackId));
    this.setState({
      isLoading: false,
      isChecked: favorites,
    });
  }

  render() {
    const { isLoading, isChecked } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? <Loading /> : (
          isChecked && <MusicCard />
        )}
      </div>
    );
  }
}

Favorites.propTypes = {
  trackId: PropTypes.number,
}.isRequired;

export default Favorites;
