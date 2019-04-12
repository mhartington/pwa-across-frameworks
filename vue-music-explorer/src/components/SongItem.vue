<template>
  <li>
    <div class="thumbnail">
      <LazyImg :lazySrc="song.attributes.artwork.url | formatArtwork(60)" alt/>
    </div>
    <p class="index" v-if="index !== null">{{index +1 }}</p>
    <div class="label">
      <h3>{{song.attributes.name}}</h3>
      <p v-if="song.attributes.artistName">{{song.attributes.artistName}}</p>
    </div>
    <p
      class="note"
      v-if="song.attributes.durationInMillis"
    >{{song.attributes.durationInMillis | msToMins}}</p>
  </li>
</template>
<style scoped>
li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.thumbnail {
  height: 80px;
  width: 80px;
  padding-right: 10px;
}
.label {
  display: block;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
}
.label h3, .label .note * {
  overflow: hidden;
  text-overflow: ellipsis;
}
.index {
  font-variant-numeric: tabular-nums;
  text-align: right;
  padding-right: 10px;
}
.note {
  font-variant-numeric: tabular-nums;
}

</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    LazyImg: () => import("@/components/LazyImg.vue")
  }
})
export default class SongItem extends Vue {
  @Prop() song!: any;
  @Prop() index!: number;
}
</script>


