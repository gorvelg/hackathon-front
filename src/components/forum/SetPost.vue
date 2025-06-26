<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
    <!-- Si connecté, afficher le formulaire -->
    <form
        v-if="isLoggedIn"
        @submit.prevent="submitPost"
        class="w-full lg:w-1/2 bg-white shadow-md border border-gray-200 rounded-xl p-6 space-y-5 mt-8 sm:mt-20 mb-20 relative"
    >
      <!-- Bouton de fermeture -->
      <button
          type="button"
          @click.stop="emit('close')"
          class="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      <div>
        <label class="block text-left font-medium mb-1 text-gray-700">Titre</label>
        <input
            v-model="post.title"
            type="text"
            class="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm"
            placeholder="Ex: Lampadaire défectueux"
            required
        />
      </div>

      <div>
        <label class="block text-left font-medium mb-1 text-gray-700">Contenu</label>
        <textarea
            v-model="post.content"
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="..."
        ></textarea>
      </div>

      <button
          type="submit"
          class="w-full bg-[#003787] hover:bg-[#002b6b] text-white py-2 rounded-full transition"
      >
        Envoyer le message
      </button>
    </form>

    <!-- Si non connecté, message d'information -->
    <div
        v-else
        class="w-full max-w-md bg-white text-center p-6 rounded-xl shadow border border-gray-200 text-gray-700"
    >
      <p class="mb-4">Vous devez être connecté pour poster un message.</p>
      <button
          @click="emit('close')"
          class="bg-[#003787] hover:bg-[#002b6b] text-white px-4 py-2 rounded-full transition"
      >
        Fermer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import { useSession } from '@/stores/session.js'

const session = useSession()
const isLoggedIn = computed(() => !!session.token)

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['submit', 'close'])

const post = ref({
  title: '',
  content: ''
})

const submitPost = () => {
  emit('submit', { ...post.value })
  post.value = { title: '', content: '' }
  emit('close')
}
</script>
