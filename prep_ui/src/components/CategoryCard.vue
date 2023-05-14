<template>
  <div class="grow card">
    <v-card width="400">
      <template v-slot:title>
        {{title}}
      </template>
      <template v-slot:subtitle>
        <v-btn v-on:click="goToUrl(url)" class="card-header-icon" aria-label="more options" onclick>
          <fa-icon icon="fa-solid fa-angle-double-right" />
        </v-btn>
      </template>
      <template v-slot:text>
        <slot />
      </template>
    </v-card>
  </div>
</template>

<script lang="ts">
import router from '@/router';

export default {
  name: 'CategoryCard',
  props: {
    title: String,
    url: String,
  },
  methods: {
    goToUrl: (url: string) => {
      router.push({ path: url });
    },
  },
};

</script>

<style scoped>
  div.card {
    margin-bottom: 0.8rem;
  }

  div.grow { transition: all .2s ease-in-out; }
  div.grow:hover { transform: scale(1.03); }
</style>
