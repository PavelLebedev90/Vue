<script setup lang="ts">
import useStore, { IPost } from '@/stores/posts'
import { computed, reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { accessOptions } from '@/constant/accessOptions'
import { debounced } from '@/helpers/debounce'
interface IProp {
  isDefaultMode: boolean
  initValue?: IPost
}
const store = useStore()

const router = useRouter()
const { isDefaultMode, initValue } = defineProps<IProp>()
const emits = defineEmits<{
  (e: 'changeMode'): void
  (e: 'updatePost', newPost: Omit<IPost, 'id'>): void
}>()

const newPost = reactive<Omit<IPost, 'id'>>({
  title: initValue?.title ?? '',
  description: initValue?.description ?? '',
  access: initValue?.access ?? 'user',
  count: initValue?.count.toString() ?? '0'
})

const goBack = () => {
  if (isDefaultMode) {
    window.history.length > 2 ? router.back() : router.replace('/')
  } else {
    emits('changeMode')
  }
}
const clearForm = () => {
  newPost.description = ''
  newPost.title = ''
  newPost.access = 'user'
  newPost.count = '0'
}

const createPostHandler = () => {
  if (isDefaultMode) {
    store.addPost({...newPost , count: Number(newPost.count)})
  } else {
    emits('updatePost', newPost)
  }
  clearForm()
}
const errorMessage = ref<null | string>(null)
const watchValidate = () => {
  const isValid = /^\s*[\d]+(?:.[\d]+)?\s*$/.test(newPost.count as string)
  if (!isValid) {
    errorMessage.value = 'Невалидное значение'
  } else {
    errorMessage.value = null
  }
}
const debounce = debounced(watchValidate, 600)

watch(
  () => newPost.count,
  () => {
    debounce()
  }
)
const isDisabled = computed(() => {
  return newPost.title.length === 0 && !!errorMessage.value
})
</script>

<template>
  <form @submit.prevent class="create_form">
    <my-input v-model="newPost.title" placeholder="Введи название" />
    <my-input v-model="newPost.description" placeholder="Введи описание" />
    <my-input v-model="newPost.count" placeholder="Введи число" :validateError="errorMessage" />
    <my-select v-model="newPost.access" :options="accessOptions" />
    <div class="btn_container">
      <my-button @click="goBack" btnType="danger">{{
        isDefaultMode ? 'Назад' : 'Отменить'
      }}</my-button>
      <div>
        <my-button @click="clearForm" class="clear_btn">Очистить</my-button>
        <my-button
          @click="createPostHandler"
          btnType="success"
          :disabled="isDisabled"
          >{{ isDefaultMode ? 'Создать' : 'Применить' }}</my-button
        >
      </div>
    </div>
  </form>
</template>
<style lang="scss" scoped>
.create_form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.btn_container {
  display: flex;
  justify-content: space-between;
}
.clear_btn {
  display: inline-block;
  margin-right: 10px;
}
</style>
