import { generateUsername } from '$lib/utils.js'
import { error, redirect } from '@sveltejs/kit'

export const actions = {
    register: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        const username = generateUsername(body.name.toString().split(' ').join('')).toLowerCase()
        console.log(username)
        try {
            await locals.pb.collection('users').create({ username, ...body, passwordConfirm: body.password })
            // await locals.pb.collection('users').requestVerification(body.email.toString())
        } catch (err) {
            console.log(err)
            throw error(500, "Something went wrong")
        }
        throw redirect(303, '/login')
    }
}