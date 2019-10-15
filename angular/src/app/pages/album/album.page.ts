import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss']
})
export class AlbumPage {
  album: any;
  isError: boolean;
  constructor(
    private api: MusickitService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.api
      .fetchAlbum(id)
      .pipe(
        catchError(_e => {
          this.isError = true;
          return EMPTY;
        })
      )
      .subscribe(album => (this.album = album), err => console.log('err', err));
  }
}
