<template>
  <div class="host">
    <div class="card">
      <LazyImg :lazySrc="album.attributes.artwork.url | formatArtwork(200)"/>
    </div>
    <div class="label">
      <h3>
        <span class="index">{{index + 1 }}</span>
        {{album.attributes.name}}
      </h3>
      <p>{{album.attributes.artistName}}</p>
    </div>
  </div>
</template>

<style scoped>
.host {
  max-width: 160px;
  margin: 10px;
  text-decoration: none;
  color: unset;
}
.card {
  width: 160px;
  height: 160px;
}
lazy-img {
  object-fit: cover;
}
.label {
  margin: 8px 0 16px;
  display: block;
  white-space: nowrap;
}
.label * {
  overflow: hidden;
  text-overflow: ellipsis;
}
.index {
  font-weight: 800;
}

</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    LazyImg: () => import("@/components/LazyImg.vue")
  }
})
export default class AlbumPrewviewItem extends Vue {
  @Prop() album!: any;
  @Prop() index!: number;
}
</script>
