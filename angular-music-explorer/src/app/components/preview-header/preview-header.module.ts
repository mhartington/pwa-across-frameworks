import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatArtworkUrlModule } from '../../pipes/formatArtworkUrl/format-artwork-url.module';
import { PreviewHeaderComponent } from './preview-header.component';
import { LazyImgModule } from '../lazy-img/lazy-img.module';

@NgModule({
  imports: [CommonModule,  FormatArtworkUrlModule, LazyImgModule],
  declarations: [PreviewHeaderComponent],
  exports: [PreviewHeaderComponent]
})
export class PreviewHeaderModule {}
