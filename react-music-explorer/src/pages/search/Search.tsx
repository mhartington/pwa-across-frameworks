import React, { Component, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Subject } from 'rxjs';
import { filter, debounceTime, switchMap } from 'rxjs/operators';
import { musicKitService } from '../../services/musickit-service';
const SongItem = lazy(() => import('../../components/song-item/SongItem'));
import './search.css';
export default class SearchPage extends Component<
  any,
  {
    term: string;
    isLoading: boolean;
    isError: boolean;
    albumResults: any;
    playlistResults: any;
  }
> {
  private onInput$: any;
  constructor(props: any) {
    super(props);
    this.state = {
      term: '',
      isLoading: false,
      isError: false,
      playlistResults: null,
      albumResults: null
    };
    this.onInput$ = new Subject<string>();
    this.onInput$
      .pipe(
        filter((term: any) => {
          console.log('term', term);
          if (term) return term;

          console.log('no terms');
          this.setState({
            ...this.state,
            albumResults: [],
            playlistResults: []
          });
          console.log(this.state);
        }),
        debounceTime(500),
        switchMap((term: string) => musicKitService.search(term))
      )
      .subscribe((results: any) => {
        this.setState({
          ...this.state,
          albumResults: results.albums.data,
          playlistResults: results.playlists.data
        });

        console.log(this.state);
      });
  }

  handleInputChange(ev: any) {
    this.onInput$.next(ev.target.value);
    this.setState({ ...this.state, term: ev.target.value });
  }
  render() {
    return (
      <>
        <label>
          <input
            placeholder="Artists, Songs, Lyrics, and More"
            value={this.state.term}
            onChange={ev => this.handleInputChange(ev)}
            type="search"
          />
        </label>
        <Suspense fallback={<div>Loading...</div>}>
          {this.state.albumResults && this.state.playlistResults ? (
            <>
              <ul>
                <h2>Albums</h2>
                {this.state.albumResults.map((album: any, idx: number) => (
                  <Link to={'/album/' + album.id} key={album.id}>
                    <SongItem song={album} index={idx} />
                  </Link>
                ))}
              </ul>
              <ul>
                <h2>Playlists</h2>
                {this.state.playlistResults.map(
                  (playlist: any, idx: number) => (
                    <Link to={'/playlist/' + playlist.id} key={playlist.id}>
                      <SongItem song={playlist} index={idx} />
                    </Link>
                  )
                )}
              </ul>
            </>
          ) : null}
        </Suspense>
        {}
      </>
    );
  }
}
