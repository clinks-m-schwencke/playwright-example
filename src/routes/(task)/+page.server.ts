// import { serialiseNonPOJOs } from '$lib/utils.js'
// import { error, redirect } from '@sveltejs/kit'

import { redirect } from "@sveltejs/kit"

// export type ITodo = {
//     id: string
//     isDone: boolean
//     title: string
//     description: string
//     dueDate: string
// }

export const load = async ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login')
    }
    return
    // const getList = async (userId: string) => {
    //     try {
    //         const todos: ITodo[] = serialiseNonPOJOs(await locals.pb.collection('tasks').getFullList(undefined, {
    //             filter: `user = "${userId}"`
    //         }))
    //         return todos
    //     } catch (err: any) {
    //         console.log(err)
    //         throw error(err.staus, err.message)
    //     }
    // }
    // return {
    //     tasks: await getList(locals.user.id)
    // }
}

// export const actions = {
//     create: async ({ locals, request }) => {
//         console.log('task/create')
//         const formData = await request.formData()
//         formData.append('user', locals.user.id)

//         try {
//             await locals.pb.collection('tasks').create(formData)
//         } catch (err: any) {
//             console.log(err)
//             throw error(err.status, err.message)
//         }
//         console.log(formData)
//     },
//     update: async ({ locals, request }) => {
//         console.log('task/update')
//         const formData = await request.formData()

//         formData.append('user', locals.user.id)
//         const id = formData.get('id')?.toString()
//         if (!id) {
//             console.log('Id not found')
//             throw error(500, 'Id not found')
//         }
//         const isdone = formData.get('isdone')?.toString()
//         console.log('is done', isdone)
//         formData.set('isdone', isdone === 'on' ? 'true' : 'false')

//         try {
//             await locals.pb.collection('tasks').update(id, formData)
//         } catch (err: any) {
//             console.log(err)
//             throw error(err.status, err.message)
//         }
//         console.log(formData)
//     }
// }