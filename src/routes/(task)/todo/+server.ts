import { error, redirect } from '@sveltejs/kit'

export async function PATCH({ request, locals }): Promise<void> {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login')
    }
    const body = await request.json()

    body.user = locals.user.id
    try {
        await locals.pb.collection('tasks').update(locals.user.id, body)
    } catch (err: any) {
        console.log(err)
        throw error(err.status, err.message)
    }
}