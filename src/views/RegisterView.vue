<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 bg-login relative">
    <div class="absolute inset-0 z-1 bg-[#003787] opacity-25"></div>

    <form
        @submit.prevent="register"
        class="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow p-6 space-y-5 z-2 relative"
    >
      <h1 class="text-2xl font-bold text-center text-[#003787]">Inscription</h1>



      <div>
        <label for="email" class="block text-left font-medium mb-1 text-gray-700">Email</label>
        <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Ex: john.doe@example.com"
            class="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#5E844B]"
            required
        />
      </div>

      <div>
        <label for="password" class="block text-left font-medium mb-1 text-gray-700">Mot de passe</label>
        <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#5E844B]"
            required
        />
      </div>

      <button
          type="submit"
          class="w-full bg-[#3781B0] text-white py-2 rounded-full hover:bg-[#3378a3] transition"
      >
        Créer un compte
      </button>

      <p class="text-sm text-center text-gray-600">
        Déjà un compte ?
        <router-link to="/login" class="text-[#003787] underline hover:text-[#0054d1]">
          Se connecter
        </router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSession } from '@/stores/session'
import { api, loginUser } from '@/services/api'

const email = ref('')
const password = ref('')
const router = useRouter()
const session = useSession()

const register = async () => {
  try {
    await api('/api/user/register', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const token = await loginUser(email.value, password.value)

    session.login({ token })
    router.push('/')
  } catch (err) {
    alert('Erreur : ' + err.message)
  }
}
</script>

<style scoped>
.bg-login {
  background-image: url('@/assets/img/wp_login.jpg');
  background-size: cover;
  background-position: center;
}
</style>
