import { reactive } from 'vue'
export type IAccess = 'admin' | 'user' | 'employee'
export interface IPost {
  id: number
  title: string
  description: string
  access: IAccess
}
export const posts = reactive<IPost[]>([])
