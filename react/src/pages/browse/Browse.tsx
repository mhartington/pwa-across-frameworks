import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AlbumPreviewItem } from '../../components/album-preview-item/AlbumPreviewItem';
import { musicKitService } from '../../services/musickit-service';
import './browse.css';
export default class BrowsePage extends Component<
  {},
  { isLoading: Boolean; topAlbums: any; topPlaylists: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { isLoading: true, topAlbums: null, topPlaylists: null };
  }
  componentDidMount() {
    musicKitService.fetchChart().subscribe(res => {
      this.setState({
        topAlbums: res.albums[0].data,
        topPlaylists: res.playlists[0].data,
        isLoading: false
      });
    });
  }

  render() {
    return (
      <main>
        {this.state.isLoading ? <div>Loading...</div> : null}
        {this.state.topAlbums && this.state.topPlaylists ? (
          <>
            <h1>Top Albums</h1>
            <div className="top-list">
              {this.state.topAlbums.map((album: any, idx:number) => (
                <Link to={'album/' + album.id} key={album.id}>
                  <AlbumPreviewItem album={album} index={idx} />
                </Link>
              ))}
            </div>
            <h1>Top PlayLists</h1>
            <div className="top-list">
              {this.state.topPlaylists.map((playlist:any, idx:number) => (
                <Link to={'playlist/' + playlist.id} key={playlist.id}>
                  <AlbumPreviewItem album={playlist} index={idx} />
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </main>
    );
  }
}
