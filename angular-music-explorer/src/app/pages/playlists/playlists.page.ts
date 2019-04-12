import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss']
})
export class PlaylistsPage {
  playlist: any;
  isError: boolean = false;
  constructor(
    private api: MusickitService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.api
      .fetchPlaylist(id)
      .pipe(
        catchError(_e => {
          this.isError = true;
          return EMPTY;
        })
      )
      .subscribe(playlist => {
        this.playlist = playlist;
      });
  }
}
