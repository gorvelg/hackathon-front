<template>
  <section class="min-h-screen container mx-auto pt-20 pb-16">
    <h1 class="heading-1 text-[#003787]">Les dernières ActuVertes !</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
          v-for="content in contents"
          :key="content.slug"
          :title="content.title"
          :body="content.body"
          :slug="content.slug"
          :imgSrc="content.image || undefined"
      />
    </div>
  </section>
</template>
<script setup>
import Card from "@/components/blog/Card.vue";
import {api} from "@/services/api.js";
import {onMounted, ref} from "vue";

const contents = ref([]);

const fetchContents = async () => {
  try {
    const res = await api('/api/contents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/ld+json',
        Accept: 'application/ld+json'
      },
    })
    contents.value = res.member || []
  } catch (e) {
    console.error('Erreur chargement des articles', e)
  }
}

onMounted(async () => {
  await fetchContents()
  console.info('Contenus chargés :', contents.value)
})
</script>