<template>
  <div>
    <label>
      <input
        placeholder="Artists, Songs, Lyrics, and More"
        :value="term"
        @input="handleInputChange($event)"
        type="search"
      >
    </label>

    <ul v-if="albumResults">
      <h2>Albums</h2>
      <router-link
        v-for="(album, idx) in albumResults"
        :to="'/album/'+album.id"
        v-bind:key="album.id"
      >
        <SongItem :song="album" :index="idx"/>
      </router-link>
    </ul>
    <ul v-if="playlistResults">
      <h2>Playlists</h2>
      <router-link
        v-for="(album, idx) in playlistResults"
        :to="'/playlist/'+album.id"
        v-bind:key="album.id"
      >
        <SongItem :song="album" :index="idx"/>
      </router-link>
    </ul>
  </div>
</template>
<style scoped>
ul {
  padding: 0;
}
h2 {
  position: sticky;
  top: 0;
  background: white;
}
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { musicKitService } from "@/services/musickit-service";
import { Subject } from "rxjs";
import { debounceTime, filter, switchMap } from "rxjs/operators";
@Component({
  components: {
    SongItem: () => import("@/components/SongItem.vue")
  }
})
export default class AlbumPage extends Vue {
  isLoading: boolean = true;
  albumResults: any[] | null = null;
  playlistResults: any[] | null = null;
  term = "";
  onInput$ = new Subject<string>();

  mounted() {
    this.onInput$
      .pipe(
        filter((term: any) => {
          if (term) return term;
          this.albumResults = null;
          this.playlistResults = null;
        }),
        debounceTime(500),
        switchMap((term: string) => musicKitService.search(term))
      )
      .subscribe((results: any) => {
        this.albumResults = results.albums.data;
        this.playlistResults = results.playlists.data;
      });
  }
  handleInputChange(event: any) {
    this.term = event.target.value
    this.onInput$.next(event.target.value);
  }
}
</script>

