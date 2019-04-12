import { Component, OnInit } from '@angular/core';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss']
})
export class BrowsePage implements OnInit {
  isLoading = true;
  topAlbums: any;
  topPlaylists: any;
  constructor(private api: MusickitService) {}
  ngOnInit() {
    if (this.isLoading) {
      this.api.fetchChart().subscribe(data => {
        this.topAlbums = data.albums[0].data;
        this.topPlaylists = data.playlists[0].data;
        this.isLoading = false;
      });
    }
  }
}
