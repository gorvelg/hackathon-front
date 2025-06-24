import { useSession } from '@/stores/session.js'

const BASE_URL = import.meta.env.VITE_API_URL

export async function loginUser(email, password) {
    const res = await fetch(BASE_URL + '/api/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // pas ld+json ici
        },
        body: JSON.stringify({ username: email, password }),
    })

    const json = await res.json()

    if (!res.ok) {
        throw new Error(json.error || 'Erreur de connexion')
    }

    return json.token // juste le token
}


export async function api(url, params = {}, { auth = true } = {}) {
    const session = useSession()

    params = Object.assign(
        {
            mode: 'cors',
            cache: 'no-cache',
        },
        params,
    )

    params.headers = Object.assign(
        {
            Accept: 'application/ld+json', // <— Important pour Hydra
            'Content-Type': 'application/ld+json',
        },
        params.headers,
    )

    if (auth && session.token) {
        params.headers.Authorization = `Bearer ${session.token}`
    }

    const response = await fetch(BASE_URL + url, params)
    const json = await response.json()

    if (!response.ok) {
        let errorMessage = json.error || response.status
        throw new Error(errorMessage)
    }

    return json
}