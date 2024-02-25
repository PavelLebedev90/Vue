<template>
  <button v-bind:class="btnType">
    <slot>Кнопка</slot>
  </button>
</template>
<script lang="ts">
export default {
  name: 'MyButton'
}
</script>
<script setup lang="ts">
interface IProp {
  btnType?: 'default' | 'success' | 'danger'
}
withDefaults(defineProps<IProp>(), {
  btnType: 'default'
})
</script>
<style scoped lang="scss">
button {
  outline: none;
  background-color: transparent;
  padding: 7px;
  transition: 0.3s;
  cursor: pointer;
  border-radius: 4px;
}
.default {
  border: 2px solid rgb(124, 139, 182);
  &:hover {
    background-color: rgb(241, 241, 241);
  }
  &:active {
    background-color: rgb(124, 139, 182);
  }
}
.success {
  border: 2px solid rgb(89, 193, 89);
  color: rgb(89, 193, 89);
  &:hover {
    background-color: rgb(117, 211, 88);
    color: inherit;
  }
  &:active {
    background-color: rgb(124, 182, 146);
    color: inherit;
  }
}
.danger {
  border: 2px solid rgb(245, 162, 55);
  color: rgb(245, 162, 55);
  &:hover {
    background-color: rgb(245, 162, 55);
    color: inherit;
  }
  &:active {
    background-color: rgb(244, 182, 101);
    color: inherit;
  }
}
</style>
