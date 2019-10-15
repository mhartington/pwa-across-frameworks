import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlbumPreviewItemsModule } from '../../components/album-preview-items/album-preview-items.module';
import { SongItemModule } from '../../components/song-item/song-item.module';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';
import { BrowsePage } from './browse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SongItemModule,
    AlbumPreviewItemsModule,
    FormatArtworkUrlModule,
    RouterModule.forChild([{ path: '', component: BrowsePage }])
  ],
  declarations: [BrowsePage]
})
export class BrowsePageModule {}
