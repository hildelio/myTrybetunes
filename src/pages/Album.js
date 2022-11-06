import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends Component {
  state = {
    isLoading: false,
    album: {},
    musics: [],

  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: true });
    const disc = await getMusics(id);
    console.log(disc);
    this.setState({
      album: disc[0],
      musics: disc.filter((e) => e.kind === 'song'),
      isLoading: false,
    });
  }

  render() {
    const { isLoading, album, musics } = this.state;
    return (
      <div data-testid="page-album">
        {isLoading ? <Loading /> : (
          <div>
            <Header />
            <p
              data-testid="artist-name"
            >
              {album.artistName}
            </p>
            <p
              data-testid="album-name"
            >
              {album.collectionName}
            </p>
            {musics && musics.map((e) => (<MusicCard
              key={ e.trackId }
              trackName={ e.trackName }
              previewUrl={ e.previewUrl }
            />))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
