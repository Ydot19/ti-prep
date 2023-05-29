<template>
  <label tabindex="0" class="switch">
    <input type="checkbox">
    <span class="slider" @click="toggleEditability"></span>
    <span class="icon read" @click="setEditability(true)"><fa-icon style="color: ghostwhite" :icon="['fas', 'glasses']" size="xs"/></span>
    <span class="icon write" @click="setEditability(false)"><fa-icon style="color: ghostwhite" :icon="'pen'" size="xs"/></span>
  </label>
</template>

<script lang="ts">
import { watch, ref, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'read-update-toggle',
  emits: ['is-editable'],
  setup: (props, { emit }) => {
    const state = reactive({ editable: false });
    const setEditability = (val: boolean) => {
      state.editable = val;
    };

    const toggleEditability = () => {
      const curr = state.editable;
      state.editable = !curr;
    };

    watch(state, () => {
      emit('is-editable', state.editable);
    });
    return {
      state,
      setEditability,
      toggleEditability,
    };
  },
});
</script>

<style scoped>
.switch input {
  display: none;
}

.switch {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 50px;
  height: 24px;
  background: #4d4d4d;
  border-radius: 100px;
  padding: 0 2px;
  transition: .3s;
  cursor: pointer;
  position: relative;
}

.slider {
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 100px;
  transition: .3s;
  border: 1px solid transparent;
  z-index: 1000;
}

.icon {
  display: block;
  position: absolute;
  transition: .3s;
}

.read {
  right: 7px;
  opacity: 1;
}

.write {
  left: 7px;
  opacity: 0;
}

.switch:hover .slider, .switch:focus .slider {
  border: 1px solid #4d4d4d;
  box-shadow: 0 0 2px 3px #86d46b;
}

.switch:active .slider {
  box-shadow: 0 0 5px 5px #86d46b;
}

.switch input:checked+.slider {
  transform: translateX(26px);
}

.switch input:checked~.write {
  opacity: 1;
}

.switch input:checked~.read {
  opacity: 0;
}
</style>
