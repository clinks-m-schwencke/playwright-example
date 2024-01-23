import { error, redirect } from '@sveltejs/kit'

export const actions = {
    login: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())
        console.log(body)
        try {
            await locals.pb.collection('users').authWithPassword(body.email.toString(), body.password.toString())
        } catch (err) {
            console.log(err)
            throw error(500, '/Login: Something went wrong')
        }
        throw redirect(303, '/')
    }
}