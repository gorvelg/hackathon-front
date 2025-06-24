import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useSession = defineStore('session', () => {
    const token = ref(localStorage.getItem('token'))
    const loggedIn = ref(!!token.value)

    function login({ token: newToken, user: newUserData }) {
        loggedIn.value = true
        token.value = newToken

        localStorage.setItem('token', newToken)
    }


    function logout() {
        loggedIn.value = false
        token.value = null
        localStorage.removeItem('token')
    }

    return {
        token,
        loggedIn,
        login,
        logout,

    }
})