import { reactive, readonly, ref } from 'vue'
export type IAccess = 'admin' | 'user' | 'employee'
export interface IPost {
  id: number
  title: string
  description: string
  access: IAccess
  count: number | string
  email: string
}
export const posts = reactive<IPost[]>([])
const postId = ref(0)
export default function (){
  function addPost(post: Omit<IPost, 'id'>){
    posts.push({...post, id: postId.value++})
  }
  function deletePost(postIndex: number){
    posts.splice(postIndex, 1)
  }
  function editPost(newPost: IPost, postIndex: number){
    posts.splice(postIndex, 1, newPost)
  }
  return {
    addPost,
    deletePost,
    editPost,
    posts: readonly(posts)
  }
}
