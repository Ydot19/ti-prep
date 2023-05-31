<template>
  <div class="dashboard">
    <svg>
      <circle class="bg" cx="57" cy="57" r="52" />
      <circle class="meter" cx="57" cy="57" r="52" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CompletionCircle',
  props: {
    completed: Number,
    total: Number,
  },
  setup(props) {
    const circleRemainder = Math.ceil(360 * (1 - props.completed / props.total));
    return {
      circleRemainder,
    };
  },
};
</script>

<style scoped>
body {
  display: grid;
  height: 100vh;
  place-items: center;
  background: #243b47;
}

.dashboard {
  display: flex;
  justify-content: center;
}

svg {
  width: 114px;
  height: 114px;
  margin: 1em;
}

.bg {
  fill: none;
  stroke-width: 10px;
  stroke: #1A2C34;
}

[class^="meter"] {
  fill: none;
  stroke-width: 10px;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;

}

.meter {
  stroke-dasharray: 360;
  stroke-dashoffset: v-bind(circleRemainder);
  stroke: goldenrod;
  animation: progress-1 1s ease-out;
}

@keyframes progress-1 {
  from {
    stroke-dashoffset: 360;
  }
  to {
    stroke-dashoffset: v-bind(circleRemainder);
  }
}
</style>
