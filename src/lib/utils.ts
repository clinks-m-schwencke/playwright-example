import { randomBytes } from 'crypto'

export const serialiseNonPOJOs = (obj: any) => {
    return structuredClone(obj)
}

export const generateUsername = (name: string) => {
    const id = randomBytes(2).toString('hex')
    return `${name.slice(0, 5)}${id}`
}