import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimePipeModule } from '../../pipes/ms-to-mins/ms-to-mins.module';
import { SearchPage } from './search.page';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SongItemModule } from '../../components/song-item/song-item.module';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';

@NgModule({
  imports: [
    CommonModule,
    FormatArtworkUrlModule,
    RouterModule.forChild([{ path: '', component: SearchPage }]),
    TimePipeModule,
    ReactiveFormsModule,
    SongItemModule
  ],
  declarations: [SearchPage],
})
export class SearchModule { }

