<template>
  <div class="artwork-artwork" v-bind:style="{backgroundImage: bg}">
    <div class="artwork-header">
      <div class="album-info" v-if="collection">
        <LazyImg
          class="header-artwork"
          :lazySrc="collection.attributes.artwork.url | formatArtwork(1500)"
        />
        <div class="album-detail">
          <h3>{{collection.attributes.name}}</h3>
          <p>{{ collection.attributes.artistName ? collection.attributes.artistName : collection.attributes.curatorName }}</p>
          <p>{{ collection.attributes.description ? collection.attributes.description.short : collection.attributes.genreNames[0]}}</p>
          <p>{{collection.relationships.tracks.data.length}} Songs, {{duration}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.artwork-artwork {
  display: block;
  background-repeat: no-repeat no-repeat;
  background-size: cover;
  background-position: center center;
}
.artwork-header {
  display: flex;
  background-color: rgba(34, 34, 34, 0.8);
  backdrop-filter: blur(8px);
  color: #fff;
  overflow: hidden;
  height: 300px;
  align-items: center;
  justify-content: flex-start;
}
.header-wallpaper {
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.3;
  filter: blur(4px);
}
.album-info {
  display: flex;
  align-items: center;
  padding-left: env(safe-area-inset-start, 0);
}
.header-artwork {
  border-radius: 4px;
  display: block;
  height: 200px;
  width: 200px;
  margin: 0 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.album-detail {
  line-height: 0.6;
  white-space: nowrap;
}
.album-detail h3 {
  font-weight: 800;
}
@media (max-width: 650px) {
  .header-artwork {
    display: none;
  }
}

</style>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    LazyImg: () => import("@/components/LazyImg.vue")
  }
})
export default class PreviewHeader extends Vue {
  @Prop() collection!: any;

  get bg() {
    return `url("${(window as any).MusicKit.formatArtworkURL(
      { url: this.collection.attributes.artwork.url },
      1000,
      1000
    )}`;
  }
  get duration(): string {
    let duration = 0;
    for (const song of this.collection.relationships.tracks.data) {
      if (song.attributes.durationInMillis) {
        duration += song.attributes.durationInMillis;
      }
    }

    const { hours, minutes } = (window as any).MusicKit.formattedMilliseconds(
      duration
    );
    const hourTime = hours === 0 ? `` : `${hours} hours, `;
    const minutesTime = `${minutes} minutes`;
    return `${hourTime} ${minutesTime} `;
  }
}
</script>
