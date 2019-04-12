import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  switchMap,
  tap
} from 'rxjs/operators';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage {
  public hasSearch = false;
  public isError = false;
  public isLoading = false;
  public searchInput = new FormControl('');
  albumResults: any;
  artistResults: any;
  playlistResults: any;

  constructor(
    private api: MusickitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  searchCleared() {
    this.hasSearch = false;
    this.isError = false;

    this.albumResults = null;
    this.artistResults = null;
    this.playlistResults = null;
    this.router.navigate([]);
  }
  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(
        filter(term => {
          if (term) {
            this.isLoading = true;
            this.isError = false;
            this.hasSearch = true;
            return term;
          } else {
            this.searchCleared();
          }
        }),
        debounceTime(500),
        tap(term => {
          this.router.navigate([], { queryParams: { query: term } });
          return term;
        }),
        switchMap(term =>
          this.api.search(term).pipe(
            catchError(() => {
              this.isLoading = false;
              this.isError = true;
              return EMPTY;
            })
          )
        ),
        tap(() => this.isLoading = false)
      )
      .subscribe(results => {
        this.albumResults = results['albums']
          ? results['albums']['data']
          : null;
        this.artistResults = results['artists']
          ? results['artists']['data']
          : null;
        this.playlistResults = results['playlists']
          ? results['playlists']['data']
          : null;
      });
    const qp = this.route.snapshot.queryParams.query;
    this.searchInput.setValue(qp);
  }
}
