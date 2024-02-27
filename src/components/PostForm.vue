<script setup lang="ts">
import useStore, { IPost } from '@/stores/posts'
import { computed, reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { accessOptions } from '@/constant/accessOptions'
import { COUNT_REGEXP, EMAIL_REGEXP } from '@/constant/regExp'
import { debounced } from '@/helpers/debounce'
interface IProp {
  initValue?: IPost
}
const store = useStore()

const router = useRouter()
const { initValue } = defineProps<IProp>()
const emits = defineEmits<{
  (e: 'changeMode'): void
  (e: 'updatePost', newPost: Omit<IPost, 'id'>): void
}>()

const newPost = reactive<Omit<IPost, 'id'>>({
  title: initValue?.title ?? '',
  description: initValue?.description ?? '',
  access: initValue?.access ?? 'user',
  count: initValue?.count.toString() ?? '0',
  email: initValue?.email ?? '',
  mode: 'default'
})
const errorMessage = reactive({
  count: '',
  email: '',
  formError: ''
})
const goBack = () => {
  window.history.length > 2 ? router.back() : router.replace('/')
}
const clearForm = () => {
  newPost.description = ''
  newPost.title = ''
  newPost.access = 'user'
  newPost.count = '0'
  newPost.email = ''
}

const createPostHandler = () => {
  const сoncurrenceEmail = store.posts.find((el) => el.email === newPost.email)
  if (сoncurrenceEmail) {
    errorMessage.formError = 'посты должны иметь уникальные emails'
    return
  }
  store.addPost({ ...newPost, count: Number(newPost.count) })
  clearForm()
}

const watchValidate = (field: 'count' | 'email') => {
  switch (field) {
    case 'count': {
      const isValidCount = COUNT_REGEXP.test(newPost.count as string)
      if (!isValidCount) {
        errorMessage.count = 'Введено не число'
      } else {
        errorMessage.count = ''
      }
      break
    }
    case 'email': {
      const isValidEmail = EMAIL_REGEXP.test(newPost.email)
      if (!isValidEmail) {
        errorMessage.email = 'Невалидная почта'
      } else {
        errorMessage.email = ''
      }
    }
  }
}
const debounce = debounced(watchValidate, 600)

watch(
  () => [newPost.count, newPost.email],
  (actual, prev) => {
    const validateField = actual[0] !== prev[0] ? 'count' : 'email'
    debounce(validateField)
  }
)
watch(
  newPost,
  () => {
    errorMessage.formError = ''
  },
  {
    deep: true
  }
)
const isDisabled = computed(() => {
  return newPost.title.length === 0 || !!errorMessage.count || !!errorMessage.email
})
</script>

<template>
  <form @submit.prevent class="create_form">
    <my-input v-model="newPost.title" placeholder="Введи название" />
    <my-input v-model="newPost.description" placeholder="Введи описание" />
    <my-input
      v-model="newPost.count"
      placeholder="Введи число"
      :validateError="errorMessage.count"
    />
    <my-input
      v-model="newPost.email"
      placeholder="Введи почту"
      :validateError="errorMessage.email"
    />
    <my-select v-model="newPost.access" :options="accessOptions" />
    <p v-show="errorMessage.formError" class="form_error">{{ errorMessage.formError }}</p>
    <div class="btn_container">
      <my-button @click="goBack" btnType="danger">{{ 'Назад' }}</my-button>
      <div>
        <my-button @click="clearForm" class="clear_btn">Очистить</my-button>
        <my-button @click="createPostHandler" btnType="success" :disabled="isDisabled">{{
          'Создать'
        }}</my-button>
      </div>
    </div>
  </form>
</template>
<style lang="scss" scoped>
.create_form {
  position: relative;
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
.form_error {
  position: absolute;
  top: 80%;
  color: rgb(158, 2, 2);
}
</style>
