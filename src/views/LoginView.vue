<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F9EEE3] px-4 py-12">
    <form
        @submit.prevent="login"
        class="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow p-6 space-y-5"
    >
      <h1 class="text-2xl font-bold text-center text-[#5E844B]">Connexion</h1>

      <div>
        <label for="email" class="block text-left font-medium mb-1 text-gray-700">Email</label>
        <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Ex: toto@example.com"
            class="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#5E844B]"
            required
        />
      </div>

      <div>
        <label for="password" class="block text-left font-medium mb-1 text-gray-700"
        >Mot de passe</label
        >
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
          class="w-full bg-[#5E844B] text-white py-2 rounded-full hover:bg-[#4c6e3e] transition"
      >
        Se connecter
      </button>

      <p class="text-sm text-center text-gray-600">
        Pas encore inscrit ?
        <router-link to="/register" class="text-[#5E844B] underline hover:text-[#3f6b33]">
          Créer un compte
        </router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '@/services/api.js'
import { useSession } from '@/stores/session.js'

const email = ref('')
const password = ref('')
const router = useRouter()
const session = useSession()

const login = async () => {
  try {
    const token = await loginUser(email.value, password.value)

    session.login({ token })
    router.push('/')
  } catch (err) {
    alert(err.message)
  }
}
</script>

<style scoped>
/* Tu peux ajouter des animations ou ajustements ici si besoin */
</style>