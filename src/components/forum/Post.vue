<template>
  <article class="w-full max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8 space-y-6 z-99">
    <h1 class="text-3xl font-bold text-[#003787]">{{ title }}</h1>
    <p class="text-gray-600 text-sm">
      Publié par <span class="font-semibold">{{ author.name || 'Anonyme' }}</span>
    </p>
    <div class="text-gray-800 text-base leading-relaxed whitespace-pre-line">
      {{ content }}
    </div>
  </article>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Object,
    required: false,
    default: () => ({ name: 'Anonyme' })
  }
})
</script>