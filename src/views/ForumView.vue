<template>
  <section class="flex flex-col gap-4 min-h-screen container mx-auto px-4 py-24">
      <Post
          v-for="post in posts"
          :title="post.title"
          :content="post.content"
          :author="post.author"
      />



    <!-- Bouton pour ouvrir le modal -->
    <div
        @click="openModal"
        class="cursor-pointer fixed bottom-8 right-8 rounded-full bg-[#3781B0] text-white flex border-2 border-white h-12 w-12 justify-center items-center p-4 shadow-lg z-[9999]"
    >
      <font-awesome-icon icon="message" />
    </div>

    <button
        @click="openModal"
        class="group absolute cursor-pointer fixed bottom-8 right-8 flex items-center justify-center overflow-hidden rounded-full bg-[#3781B0] text-white px-4 h-12 transition-all duration-300 shadow-lg z-[9999]"
    >
      <font-awesome-icon icon="message" class="text-xl transition-transform duration-300" />

      <span
          class="group-hover:ml-2 whitespace-nowrap opacity-0 max-w-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden"
      >
      Ajouter un message
    </span>
    </button>

    <SetPost
        :isOpen="isModalOpen"
        @close="isModalOpen = false"
        @submit="handleSubmitPost"
    />



  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/services/api'

import Post from "@/components/forum/Post.vue"
import SetPost from "@/components/forum/SetPost.vue";

const route = useRoute()
const posts = ref({})
const isModalOpen = ref(false)

const fetchContents = async () => {
  try {
    const res = await api('/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/ld+json',
        Accept: 'application/ld+json'
      },
    })
    posts.value = res.member || []
  } catch (e) {
    console.error('Erreur chargement des articles', e)
  }
}

const handleSubmitPost = async (data) => {
  console.log('Formulaire posté :', data)
  await api('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/ld+json',
      Accept: 'application/ld+json'
    }
  })
}

function openModal(){
  isModalOpen.value = true
}

onMounted(async () => {
  await fetchContents()
  console.info('Contenus chargés :', posts.value)
})
</script>
