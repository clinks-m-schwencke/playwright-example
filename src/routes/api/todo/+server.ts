import type { ITodo } from '$lib/types/todo';
import { serialiseNonPOJOs } from '$lib/utils';
import { error, json, redirect } from '@sveltejs/kit';

export async function GET({ request, locals, url }): Promise<Response> {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login')
    }
    console.log(url.searchParams)
    const getList = async (userId: string) => {
        try {
            const todos: ITodo[] = serialiseNonPOJOs(await locals.pb.collection('tasks').getFullList(undefined, {
                filter: `user = "${userId}"`
            }))
            return todos
        } catch (err: any) {
            console.log(err)
            throw error(err.staus, err.message)
        }
    }
    // return new Response(null, { status: 401 })

    return json(await getList(locals.user.id))
}
export async function POST({ request, locals }): Promise<Response> {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login')
    }

    const body = await request.json()
    body.user = locals.user.id

    try {
        const newTask = await locals.pb.collection('tasks').create(body)

        return json(newTask, { status: 200 })
    } catch (err: any) {
        console.log(err)
        throw error(err.status, err.message)
    }
}

export async function PATCH({ request, locals }): Promise<Response> {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login')
    }

    const body = await request.json()
    body.user = locals.user.id

    try {
        const updatedTask = await locals.pb.collection('tasks').update(body.id, body)

        return json(updatedTask, { status: 200 })
    } catch (err: any) {
        console.log(err)
        throw error(err.status, err.message)
    }
}