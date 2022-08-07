<template>
  <div class="container">
    <div class="has-text-justified is-vcentered">
      <p class="slide-right has-text-centered is-size-1 is-underlined">Technical Interview Prep</p>
    </div>
  </div>
</template>

<style scoped>

  .slide-right {
    animation-name: slide-right;
    animation-duration: 2s;
    animation-fill-mode: forwards;
  }
  
  @keyframes slide-right {
    from {
      visibility: visible;
      margin-top: 100%;
    }
    to {
      visibility: visible;
      margin-top: 0%;
    }
  }

</style>
