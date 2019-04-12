import { LazyImg } from '../lazyimg/LazyImg';
import { formatArtwork } from '../../pipes/formatArtwork';
import React from 'react';
import './preview-header.css';
export function PreviewHeader(props: { collection: any }) {
  const { duration, bg } = getExtras(props.collection);

  return (
    <div className="artwork-artwork" style={{ backgroundImage: bg }}>
      <div className="artwork-header">
        <div className="header-artwork">
          <LazyImg
            src={formatArtwork(props.collection.attributes.artwork.url, 1500)}
            alt="Artwork"
          />
        </div>
        <div className="album-detail">
          <h3>{props.collection.attributes.name}</h3>

          <p>
            {props.collection.attributes.artistName
              ? props.collection.attributes.artistName
              : props.collection.attributes.curatorName}
          </p>
          <p>
            {props.collection.attributes.description
              ? props.collection.attributes.description.short
              : props.collection.attributes.genreNames[0]}
          </p>

          <p>
            {props.collection.relationships.tracks.data.length} Songs,{' '}
            {formatDuration(duration)}
          </p>
        </div>
      </div>
    </div>
  );
}
function getExtras(collection: any): { duration: number; bg: string } {
  let duration = 0;
  let bg = '';
  for (const song of collection.relationships.tracks.data) {
    if (song.attributes.durationInMillis) {
      duration += song.attributes.durationInMillis;
    }
  }
  bg = `url("${(window as any).MusicKit.formatArtworkURL(
    { url: collection.attributes.artwork.url },
    1000,
    1000
  )}`;
  return { duration, bg };
}
function formatDuration(val: number) {
  const { hours, minutes } = (window as any).MusicKit.formattedMilliseconds(
    val
  );
  const hourTime = hours === 0 ? `` : `${hours} hours, `;
  const minutesTime = `${minutes} minutes`;
  return `${hourTime} ${minutesTime} `;
}
