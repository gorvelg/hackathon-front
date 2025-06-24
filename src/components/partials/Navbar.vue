<template>
  <header class="bg-[#8C9F82] text-white shadow-lg">
    <ul class="flex justify-between">
      <div class="p-4">
        <RouterLink to="/" class="flex-shrink-0">Signalements</RouterLink>
      </div>
      <div class="p-4" v-if="isLoggedIn">
        <button @click="logout">Se déconnecter</button>
      </div>
      <div class="p-4" v-else>
        <RouterLink to="/login" class="flex-shrink-0">Se connecter</RouterLink>
      </div>
    </ul>
  </header>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSession } from '@/stores/session'

const router = useRouter()
const session = useSession()
const isLoggedIn = computed(() => !!session.token)
const logout = () => {
  session.logout();
  router.push('/login');
}
</script>