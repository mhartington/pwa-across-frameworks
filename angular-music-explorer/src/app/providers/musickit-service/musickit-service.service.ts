import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { delay, retryWhen, timeout } from 'rxjs/operators';
import { MusickitConfig } from '../musickit-config/musickit-config';

@Injectable({
  providedIn: 'root'
})
export class MusickitService {
  constructor(
    private musicKitService: MusickitConfig,
    private http: HttpClient
  ) {}

  API_URL = 'https://api.music.apple.com';

  getApiHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.musicKitService.musicKit.developerToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Music-User-Token': this.musicKitService.musicKit.musicUserToken
    });
  }

  fetchAlbum(id: string): Observable<any> {
    return from(this.musicKitService.musicKit.api.album(id));
  }

  search(query: string): Observable<any> {
    const searchTypes = ['albums', 'artists', 'playlists'];
    return from(
      this.musicKitService.musicKit.api.search(query, {
        types: searchTypes,
        limit: 50
      })
    ).pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }

  fetchPlaylist(id: string): Observable<any> {
    return from(this.musicKitService.musicKit.api.playlist(id));
  }

  fetchChart(): Observable<any> {
    const searchTypes = ['albums', 'playlists'];
    return from(
      this.musicKitService.musicKit.api.charts(null, {
        types: searchTypes,
        limit: 50
      })
    );
  }
}
