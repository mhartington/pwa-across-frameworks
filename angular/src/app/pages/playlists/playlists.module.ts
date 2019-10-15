import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PreviewHeaderModule } from '../../components/preview-header/preview-header.module';
import { SongItemModule } from '../../components/song-item/song-item.module';
import { PlaylistsPage } from './playlists.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PreviewHeaderModule,
    SongItemModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaylistsPage]
})
export class PlaylistsPageModule {}
