import React, { Component } from 'react';
import { musicKitService } from '../../services/musickit-service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { PreviewHeader } from '../../components/preview-header/PreviewHeader';
import SongItem from '../../components/song-item/SongItem';
import './playlist.css';
export default class PlaylistPage extends Component<
  any,
  { playlist: any; isError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { isError: false, playlist: null };
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    musicKitService
      .fetchPlaylist(id)
      .pipe(
        catchError(_e => {
          this.setState({
            isError: true,
            playlist: null
          });
          return EMPTY;
        })
      )
      .subscribe(album => {
        this.setState({
          isError: true,
          playlist: album
        });
      });
  }

  render() {
    return (
      <>
        {this.state.playlist !== null ? (
          <>
            <h1>{this.state.playlist.attributes.name}</h1>
            <PreviewHeader collection={this.state.playlist} />
            <ul>
              {this.state.playlist.relationships.tracks.data.map(
                (song: any, idx: number) => (
                  <SongItem song={song} index={idx} key={song.id} />
                )
              )}
            </ul>
          </>
        ) : null}
      </>
    );
  }
}
