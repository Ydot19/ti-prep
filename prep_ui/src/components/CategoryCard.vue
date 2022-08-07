<template>
  <div class="grow card">
    <div class="card-header">
      <p class="card-header-title">
        {{title}}
      </p>
      <button v-on:click="goToUrl(url)" class="card-header-icon" aria-label="more options" onclick>
        <fa-icon icon="fa-solid fa-angle-double-right"></fa-icon>
      </button>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router"

  export default {
    name: "Category",
    props: {
      title: String,
      url: String,
    },
    methods: {
      goToUrl: (url: string) =>{
        router.push({ path: url})
      }
    }
  }
  
  
</script>

<style>
  div.card {
    margin-bottom: 0.8rem;
  }

  div.card-content {
    text-align: left;
  }

  div.grow { transition: all .2s ease-in-out; }
  div.grow:hover { transform: scale(1.03); }
</style>
