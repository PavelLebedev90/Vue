<script setup lang="ts">
import { IMode, IPost } from '@/stores/posts'
import { ref, computed, watch } from 'vue'
import useStore from '@/stores/posts'
import { accessOptions } from '@/constant/accessOptions'
const props = defineProps<{
  post: IPost
}>()
const value = ref<string | number>()
const entity = ref<keyof IPost>()
const { changePostMode, editEntity } = useStore()
const curElement = computed(() => {
  if (['access_edit'].includes(props.post.mode)) {
    return 'my-select'
  }
  return 'my-input'
})

const updatePost = () => {
  editEntity(props.post.id, entity.value!, value.value!)
  changeMode()
}
const changeMode = () => {
  changePostMode(props.post.id, 'default')
}
watch(
  () => props.post.mode,
  () => {
    const splitingMode = props.post.mode.split('_')
    const initValue = splitingMode[0] as keyof IPost
    value.value = props.post[initValue].toString()
    entity.value = initValue
  },
  {
    immediate: true,
    once: true
  }
)
</script>

<template>
  <div class="edit_mode">
    <!-- <slot>
      <my-input v-model="value" placeholder="Введи наименование" />
    </slot> -->
    <component :is="curElement" v-model="value" :options="accessOptions"></component>
    <my-button @click="updatePost">применить</my-button>
    <my-button @click="changeMode">отменить</my-button>
  </div>
</template>

<style scoped>
.edit_mode {
  display: inline-flex;
  gap: 10px;
}
</style>
