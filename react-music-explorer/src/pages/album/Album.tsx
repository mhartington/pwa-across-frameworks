import React, { Component } from 'react';
import { musicKitService } from '../../services/musickit-service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { PreviewHeader } from '../../components/preview-header/PreviewHeader';
import SongItem from '../../components/song-item/SongItem';
import './album.css';
export default class AlbumPage extends Component<
  any,
  { album: any; isError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { isError: false, album: null };
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    musicKitService
      .fetchAlbum(id)
      .pipe(
        catchError(_e => {
          this.setState({
            isError: true,
            album: null
          });
          return EMPTY;
        })
      )
      .subscribe(album => {
        console.log(album);
        this.setState({
          isError: true,
          album: album
        });
      });
  }

  render() {
    // return <div>{JSON.stringify(this.state.album)}</div>;
    return (
      <>
        {this.state.album !== null ? (
          <>
            <h1>{this.state.album.attributes.name}</h1>
            <PreviewHeader collection={this.state.album} />
            <ul>
              {this.state.album.relationships.tracks.data.map(
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
