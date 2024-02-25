<script setup lang="ts">
import { IAccessOption } from '@/constant/accessOptions'
import { IAccess } from '@/stores/posts'
interface IProp {
  options: IAccessOption
  modelValue: IAccess
}
defineProps<IProp>()
const emits = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  const element = event.target as HTMLSelectElement
  emits('update:modelValue', element.value)
}
</script>
<script lang="ts">
export default {
  name: 'MySelect'
}
</script>
<template>
  <select :value="modelValue" @change="updateValue">
    <option v-for="option of options" :key="option.value" :value="option.value">{{ option.title }}</option>
  </select>
</template>
<style lang="scss" scoped></style>
