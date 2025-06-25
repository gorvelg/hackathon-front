<template>
  <RouterLink :to="{name: 'article', params:{slug: slug}}">
    <div class="bg-white h-full rounded-xl shadow-md overflow-hidden border border-gray-200 transition hover:shadow-lg">
      <div v-if="imgSrc" class="h-48 w-full overflow-hidden">
        <img :src="imgSrc" alt="illustration" class="w-full h-full object-cover" />
      </div>
      <div class="p-5">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ title }}</h2>
        <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {{ body }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    default: 'https://placehold.co/600x400',
    required: false
  },
  slug: {
    type: String,
    required: true
  }
})
</script>
