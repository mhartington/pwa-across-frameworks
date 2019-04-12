<template>
  <main>
    <div v-if="isLoading">Loading...</div>
    <template v-else>
      <h1>{{album.attributes.name}}</h1>
      <PreviewHeader :collection="album"/>
      <ul>
        <SongItem
          v-for="(song,i) in album.relationships.tracks.data"
          v-bind:key="song.id"
          :song="song"
          :index="i"
        />
      </ul>
    </template>
  </main>
</template>
<style scoped>
ul {
  padding: 0;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { musicKitService } from "@/services/musickit-service";
@Component({
  components: {
    PreviewHeader: () => import("@/components/PreviewHeader.vue"),
    SongItem: () => import("@/components/SongItem.vue")
  }
})
export default class PlaylistPage extends Vue {
  isLoading: boolean = true;
  album: any;

  mounted() {
    const id = this.$route.params.id;
    musicKitService.fetchPlaylist(id).subscribe(data => {
      this.album = data;
      this.isLoading = false;
    });
  }
}
</script>
