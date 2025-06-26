<template>
  <!-- Flash message -->
  <div
      v-if="flashMessage"
      class="fixed flex items-center gap-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-50 text-green-800 p-4 rounded-md shadow-lg z-[10000] transition"
  >
    <font-awesome-icon icon="check" class="text-green-600" />
    <div class="flex flex-col">
      <span class="font-bold">Succès !</span>
      {{ flashMessage }}
    </div>
  </div>

  <svg class="fixed bottom-0 right-0" xmlns="http://www.w3.org/2000/svg" width="483" height="548" viewBox="0 0 483 548" fill="none">
    <path d="M589.23 408.3C508.12 491.61 425.38 573.47 343.83 656.41C340.24 660.06 337.57 663.46 333.82 667.36C330.76 670.54 317.13 685.19 314.77 686.4C314 686.8 313.54 687.07 312.79 686.4L2.27 372.86L0 369.13V240.57L118.95 0L507.8 0.32L627.57 242.55L627.59 369.12C614.96 382.32 601.98 395.2 589.24 408.29L589.23 408.3ZM318.79 16.84V141.84L324.84 141.39L422.18 112.73C443.71 81.87 469.96 52.46 491.1 21.59C491.97 20.31 492.91 19.08 492.83 17.4L318.79 16.83V16.84ZM308.79 16.84H133.79C133.69 18.74 135.34 20.26 136.39 21.74C158.51 52.89 183.23 82.47 205.82 113.31L307.74 142.8C307.4 141.58 308.79 139.88 308.79 139.34V16.84ZM125.29 25.86L22.28 234.82L196.36 119.87L125.29 25.86ZM502.77 25.84L430.9 120.72L604.77 234.83L502.77 25.84ZM419.78 126.83L313.26 156.68C280.93 148.58 249.28 137.31 217 129.11C214.72 128.53 208.5 126.19 207.29 127.8L173.86 235.73L267.85 269.5L228.78 416.82H397.79L358.71 269.44L453.37 235.88L419.78 126.83ZM15.79 354.84L191.77 136.33L187.67 138.23L15.79 253.34V354.84ZM610.79 251.84C601.49 246.46 592.24 240.77 583.27 234.86C535.39 203.33 487.52 168.11 438.89 138.24C438.03 137.71 436.71 135.71 435.78 137.35L610.79 354.84V251.84ZM122.39 360.48C141.66 307.14 158.69 247.47 175.29 192.84C177.68 184.96 179.38 176.72 181.78 168.84L21.81 367.34L96.28 441.84C97.35 441.58 99 436.45 99.5 435.05C108.11 410.89 113.99 383.76 122.4 360.49L122.39 360.48ZM453.44 176.19C451.89 174.54 448.71 173.12 447.29 170.84C446.17 177.68 450.6 184.23 452.53 190.6C466.65 237.24 481.09 282.89 495.33 329.8C506.22 365.66 515.34 402.89 527.85 438.28C528.28 439.49 529.46 443.2 531.11 442.73L605.61 367.35C564.73 315.29 523.46 263.84 481.77 212.35C472.79 201.26 462.99 186.37 453.43 176.19H453.44ZM204.78 436.83L217.09 413.63L238.79 325.4C218.3 295.25 194.61 267.38 173.29 237.83C172.1 238.63 171.95 239.83 171.49 241.03C163.06 263.26 155.36 290.93 148.5 314.04C146.75 319.94 144.61 326.3 143.8 332.24L201.94 435.17C202.3 436.26 203.91 437.47 204.77 436.82L204.78 436.83ZM424.77 435.83L482.79 333.3C483.22 327.84 480.6 322.84 479.5 317.63L454.27 239.85C451.84 239.31 447.23 248.5 445.79 250.35C443.29 253.56 440.68 256.64 438.24 259.78C421.46 281.4 404.13 302.8 388.79 325.42L389.01 329.09C400.39 360.11 402.1 407.18 421.32 433.81C421.96 434.7 423.65 436.63 424.77 435.84V435.83ZM253.73 275.89L200.79 256.84L242.8 309.83L244.78 309.21L253.72 275.9L253.73 275.89ZM426.79 256.85L373.96 276C372.03 279.12 382.04 304.47 382.8 309.84L426.79 256.85ZM245.67 592.72C246.84 592.04 259.57 570.87 259.53 569.51L193.96 443.17L137.8 347.85L106.22 448.81L106.45 454.61L242.24 591.9C243.1 592.71 244.66 593.32 245.68 592.73L245.67 592.72ZM463.35 512.42C482.79 492.68 502.13 472.81 521.64 453.13L488.28 348.84C445.13 420.68 405.35 494.45 367.79 569.41C367.53 570.9 368.36 571.95 368.94 573.18C370.1 575.63 379.2 589.35 380.93 591.19C381.6 591.9 381.79 593.18 383.21 592.81C410.08 566.19 436.86 539.32 463.34 512.43L463.35 512.42ZM248.87 527.77L312.77 494.34L222.81 428.85C221.6 434.25 210.49 448.75 211.21 452.9L248.87 527.78V527.77ZM404.67 428.96L313.79 494.82L378.7 527.76L415.57 454.09L415.55 449.58C412.7 446.81 406.57 430.1 404.66 428.95L404.67 428.96ZM374.79 533.84H252.79C254.67 538.25 267.32 565.95 269.45 566.68H358.63L374.79 533.84ZM368.17 608.21C370.15 606.68 373.99 603.27 373.4 600.84C372.94 598.97 361.54 578.9 360.28 577.85C359.34 577.06 358.62 576.66 357.35 576.78L267.49 576.82L252.92 601.52L313.36 663.8L368.18 608.21H368.17Z" fill="#00000008"/>
  </svg>
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
import { api } from '@/services/api'
import Post from "@/components/forum/Post.vue"
import SetPost from "@/components/forum/SetPost.vue"

const posts = ref([])
const isModalOpen = ref(false)
const flashMessage = ref('')

function showFlash(msg) {
  flashMessage.value = msg
  setTimeout(() => {
    flashMessage.value = ''
  }, 3000)
}

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
  try {
    const created = await api('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/ld+json',
        Accept: 'application/ld+json'
      }
    })

    posts.value.unshift(created) // Ajout en haut
    isModalOpen.value = false
    showFlash('Le message a bien été publié.')
  } catch (e) {
    console.error('Erreur lors de la publication', e)
    alert('Erreur lors de la publication')
  }
}

function openModal() {
  isModalOpen.value = true
}

onMounted(fetchContents)
</script>
