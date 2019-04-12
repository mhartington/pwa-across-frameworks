import { LazyImg } from '../lazyimg/LazyImg';
import { formatArtwork } from '../../pipes/formatArtwork';
import './album-preview-item.css';
import React from 'react';
export function AlbumPreviewItem(props: { album: any; index: number }) {
  return (
    <>
      <div className="card">
        <LazyImg
          src={formatArtwork(props.album.attributes.artwork.url, 200)}
          alt="album art"
        />
      </div>
      <div className="label">
        <h3>
          <span className="index">{props.index + 1}</span>{' '}
          {props.album.attributes.name}
        </h3>
        <p>{props.album.attributes.artistName}</p>
      </div>
    </>
  );
}
