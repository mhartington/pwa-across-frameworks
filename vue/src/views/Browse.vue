<template>
  <main>
    <div v-if="isLoading">Loading...</div>

    <template v-else>
      <h1>Top Albums</h1>
      <div class="top-list">
        <router-link
          v-for="(album, index) in topAlbums"
          v-bind:key="album.id"
          :to="'/album/'+album.id"
        >
          <AlbumPreviewItem :album="album" :index="index"/>
        </router-link>
      </div>

      <h1>Top Playlists</h1>
      <div class="top-list">
        <router-link
          v-for="(playlist, index) in topPlaylists"
          v-bind:key="playlist.id"
          :to="'/playlist/'+playlist.id"
        >
          <AlbumPreviewItem :album="playlist" :index="index"/>
        </router-link>
      </div>
    </template>
  </main>
</template>
<style scoped>
h1 {
  font-weight: 700;
  margin-top: 5px;
  margin-bottom: 20px;
}

.top-list {
  display: flex;
  flex-wrap: wrap;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { musicKitService } from "@/services/musickit-service";
@Component({
  components: {
    AlbumPreviewItem: () => import('@/components/AlbumPreviewItem.vue')
  }
})
export default class BrowsePage extends Vue {
  topAlbums: any;
  topPlaylists: any;
  isLoading: boolean = true;

  mounted() {
    musicKitService.fetchChart().subscribe(data => {
      this.topAlbums = data.albums[0].data;
      this.topPlaylists = data.playlists[0].data;
      this.isLoading = false;
    });
  }
}
</script>
