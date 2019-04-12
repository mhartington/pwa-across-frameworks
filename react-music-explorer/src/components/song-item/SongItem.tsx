import { LazyImg } from '../lazyimg/LazyImg';
import { formatArtwork } from '../../pipes/formatArtwork';
import { msToMins } from '../../pipes/msToMins';
import React from 'react';
import './songitem.css';
export default function SongItem(props: { song: any; index: number }) {
  return (
    <li>
      <div className="thumbnail">
        <LazyImg
          src={formatArtwork(props.song.attributes.artwork.url, 60)}
          alt="Artwork"
        />
      </div>
      {props.index !== null ? <p className="index">{props.index + 1}</p> : null}

      <div className="label">
        <h3>{props.song.attributes.name} </h3>
        {props.song.attributes.artistName ? (
          <p>{props.song.attributes.artistName}</p>
        ) : null}
        {props.song.attributes.artistName ? (
          <p>{props.song.attributes.artistName}</p>
        ) : null}
      </div>
      {props.song.attributes.durationInMillis ? (
        <p className="note">
          {msToMins(props.song.attributes.durationInMillis)}
        </p>
      ) : null}
    </li>
  );
}
