import { from, Observable } from 'rxjs';
import { delay, retryWhen, timeout } from 'rxjs/operators';
import { musickitConfig } from './musickit-config';

class MusickitService {
  fetchAlbum(id: string): Observable<any> {
    return from(musickitConfig.musicKit.api.album(id));
  }
  search(query: string): Observable<any> {
    const searchTypes = ['albums', 'artists', 'playlists'];
    return from(
      musickitConfig.musicKit.api.search(query, {
        types: searchTypes,
        limit: 50
      })
    ).pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }
  fetchPlaylist(id: string): Observable<any> {
    return from(musickitConfig.musicKit.api.playlist(id));
  }
  fetchChart(): Observable<any> {
    const searchTypes = ['albums', 'playlists'];
    return from(
      musickitConfig.musicKit.api.charts(null, {
        types: searchTypes,
        limit: 50
      })
    );
  }
}
export const musicKitService = new MusickitService();
