import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  handleClick = async (track) => {
    this.setState({ isLoading: true });
    await addSong(track);
    this.setState({
      isLoading: false,
      isChecked: true,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      <div>
        {isLoading ? <Loading /> : (
          <div>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorites">
              Favorita
              <input
                id="favorites"
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ () => this.handleClick(trackId) }
                checked={ isChecked }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
