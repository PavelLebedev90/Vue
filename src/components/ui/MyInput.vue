<script setup lang="ts">
interface Props {
  placeholder?: string
  validateError?: string
  modelValue: string
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Введи значение'
})
const emits = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  const element = event.target as HTMLInputElement
  emits('update:modelValue', element.value)
}
</script>
<script lang="ts">
export default {
  name: 'MyInput'
}
</script>
<template>
  <span class="container">
    <input
      class="input"
      :class="{ errorInput: !!props.validateError }"
      :value="modelValue"
      @input="updateValue"
      type="text"
      :placeholder="placeholder"
    />
    <span class="error">{{ props.validateError }}</span>
  </span>
</template>
<style lang="scss" scoped>
.container {
  position: relative;
}
.input {
  width: 100%;
  padding: 7px;
  outline-color: rgb(124, 139, 182);
  border-radius: 5px;
  border: none;
  border: 1px solid rgb(216, 221, 233);
  &::placeholder {
    color: rgba(136, 140, 149, 0.706);
  }
  &.errorInput {
    outline-color: rgb(158, 2, 2);
    border: 1px solid rgb(158, 2, 2);
  }
}
.error {
  color: rgb(158, 2, 2);
  position: absolute;
  top: 95%;
  left: 0;
  font-size: 12px;
}
</style>
