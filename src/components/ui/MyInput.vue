<script setup lang="ts">
interface Props {
  placeholder?: string
  modelValue: string
}
withDefaults(defineProps<Props>(), {
  placeholder: 'Введи значение'
})
const emits = defineEmits(['update:modelValue']);

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
  <input class="input" :value="modelValue" @input="updateValue" type="text" :placeholder="placeholder" />
</template>
<style lang="scss" scoped>
.input {
   padding: 7px;
   outline-color: rgb(124, 139, 182);
   border-radius: 5px;
   border: none;
   border: 1px solid rgb(216, 221, 233);
   &::placeholder {
    color: rgba(136, 140, 149, 0.706)
   }
}

</style>
