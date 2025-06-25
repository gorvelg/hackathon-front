<template>
  <header class="bg-[#003787] text-white shadow-lg absolute inset-x-0 top-0 z-9999">
    <ul class="flex justify-between items-center p-4">
      <div class="heading">
        <RouterLink to="/">Polygone's</RouterLink>
      </div>
      <div  class="flex gap-4">
          <RouterLink :to="{name:'report'}" class="flex-shrink-0">Signalements</RouterLink>
          <RouterLink :to="{name: 'blog'}" class="flex-shrink-0">ActuVerte</RouterLink>
          <RouterLink to="/" class="flex-shrink-0">Forum</RouterLink>
      </div>
      <div class="" v-if="isLoggedIn">
        <button @click="logout">Se déconnecter</button>
      </div>
      <div class="" v-else>
        <RouterLink :to="{name: 'login'}" class="flex-shrink-0">Connexion/Inscription</RouterLink>
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