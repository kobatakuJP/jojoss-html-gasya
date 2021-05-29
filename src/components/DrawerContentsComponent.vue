<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Share </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <SNSShareButtonsComponent
          msg="ジョジョSSサ終を偲び、ガシャをHTMLで再現中ゥゥゥ！無料で引けるぞッ！"
          :tags="['ガシャ', 'ジョジョSS', '非公式']"
        ></SNSShareButtonsComponent>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Like </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <iframe
          src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fjojoss-html-gasya.netlify.app%2F&width=130&layout=button_count&action=like&size=small&share=false&height=21&appId"
          width="130"
          height="21"
          style="border: none; overflow: hidden"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Past Version </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <a
          href="https://607c3e5045487400083dba39--jojoss-html-gasya.netlify.app/"
          target="_blank"
          rel="noopener"
          >Ver 0.1.4</a
        >
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SNSShareButtonsComponent from "@/components/SNSShareButtonsComponent.vue";
@Component({
  components: {
    SNSShareButtonsComponent,
  },
})
export default class DrawerContentsComponent extends Vue {}
</script>