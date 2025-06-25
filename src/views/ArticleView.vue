<template>
  <div class="max-w-3xl mx-auto py-24 px-6">
    <h1 class="text-3xl font-bold text-[#003787] mb-6">{{ article.title }}</h1>
    <img v-if="article.img" :src="article.img" alt="illustration" class="mb-6 rounded-lg shadow" />
    <p class="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
      {{ article.body }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/services/api.js'

const route = useRoute()
const article = ref({ title: '', body: '', img: '' })

onMounted(async () => {
  try {
    const res = await api(`/api/contents?slug=${route.params.slug}`)
    article.value = res.member[0] || {
      title: 'Article introuvable',
      body: 'Aucun contenu correspondant à ce lien.'
    }
  } catch (err) {
    console.error('Erreur chargement article', err)
  }
})
</script>
