
 export const accessOptions = [
    { value: 'admin', title: 'администатор' },
    { value: 'employee', title: 'сотрудник' },
    { value: 'user', title: 'пользователь' },
] as const

export type IAccessOption = typeof accessOptions 