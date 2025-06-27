<template>
  <!-- Message flash -->
  <div
      v-if="flashMessage"
      class="fixed flex items-center gap-3 top-1/2 left-1/2 transform -translate-1/2 bg-green-50 text-green-800 p-4 rounded-md shadow-lg z-[10000] transition"
  >
    <font-awesome-icon icon="check" class="text-green-600" />
    <div class="flex flex-col">
      <span class="text-green-560 font-bold">Succès !</span>
    {{ flashMessage }}
    </div>
  </div>

  <!-- Bouton pour ouvrir le modal -->
  <button
      @click="openModal"
      class="group fixed top-8 md:top-auto md:bottom-8 right-4 md:right-8 flex items-center justify-center overflow-hidden rounded-full bg-[#3781B0] text-white px-4 h-12 transition-all duration-300 shadow-lg z-[9999]"
  >
    <svg
        class="text-xl transition-transform duration-300"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="23"
        viewBox="0 0 32 31"
        fill="none"
    >
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.87616 18.462H31.6504V0.7661H6.87616V18.462ZM0.682617 30.2592H3.77939V0.7661H0.682617V30.2592Z"
          fill="#fff"
      />
    </svg>
    <span
        class="group-hover:ml-2 whitespace-nowrap opacity-0 max-w-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden"
    >
      Signaler un événement
    </span>
  </button>

  <!-- Modal de signalement -->
  <div
      v-if="isOpenModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
  >
    <form
        v-if="isLoggedIn"
        @submit.prevent="submitReport"
        class="w-full lg:w-1/2 bg-white shadow-md border border-gray-200 rounded-xl p-6 space-y-5 mt-8 sm:mt-20 mb-20 relative"
    >
      <button
          type="button"
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      <div>
        <label class="block font-medium mb-1 text-gray-700">Titre</label>
        <input
            v-model="report.title"
            type="text"
            class="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm"
            required
        />
      </div>

      <div>
        <label class="block font-medium mb-1 text-gray-700">Localisation</label>
        <input
            v-model="report.location"
            type="text"
            class="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <div>
        <label class="block font-medium mb-1 text-gray-700">Description</label>
        <textarea
            v-model="report.description"
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
        ></textarea>
      </div>

      <button
          type="submit"
          class="w-full bg-[#003787] hover:bg-[#002b6b] text-white py-2 rounded-full transition"
      >
        Envoyer
      </button>
    </form>

    <!-- Si non connecté -->
    <div
        v-else
        class="w-full max-w-md bg-white text-center p-6 rounded-xl shadow border border-gray-200 text-gray-700"
    >
      <p class="mb-4">Vous devez être connecté pour poster un message.</p>
      <button
          @click="closeModal"
          class="bg-[#003787] hover:bg-[#002b6b] text-white px-4 py-2 rounded-full transition"
      >
        Fermer
      </button>
    </div>
  </div>

  <!-- Carte -->
  <div id="map" class="min-h-screen w-full"></div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { api } from '@/services/api.js'
import { useSession } from '@/stores/session.js'

import markerIcon from '@/assets/img/marker-icon.png'
import markerShadow from '@/assets/img/marker-shadow.png'

const session = useSession()
const isLoggedIn = computed(() => !!session.token)

const flashMessage = ref('')

function showFlashMessage(message) {
  flashMessage.value = message
  setTimeout(() => {
    flashMessage.value = ''
  }, 3000)
}

const report = ref({
  title: '',
  location: '',
  description: '',
  lat: '',
  lng: ''
})

const reports = ref([])
const isOpenModal = ref(false)
const map = ref(null)

function openModal() {
  isOpenModal.value = true
}

function closeModal() {
  isOpenModal.value = false
}

async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
  )}`
  const response = await fetch(url)
  const data = await response.json()
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
  }
  return null
}

const fetchReports = async () => {
  try {
    const res = await api('/api/reports', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/ld+json',
        Accept: 'application/ld+json'
      }
    })
    reports.value = res.member || []
  } catch (e) {
    console.error('Erreur chargement des signalements', e)
  }
}

const submitReport = async () => {
  try {
    const coords = await geocodeAddress(report.value.location)
    if (!coords) throw new Error('Adresse invalide')
    const jsonBody = {
      ...report.value,
      lat: coords[0],
      lng: coords[1]
    }

    await api('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
        Accept: 'application/ld+json'
      },
      body: JSON.stringify(jsonBody)
    })

    report.value = {
      title: '',
      location: '',
      description: '',
      lat: '',
      lng: ''
    }

    await fetchReports()

    map.value.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.value.removeLayer(layer)
      }
    })

    for (const r of reports.value) {
      if (r.lat && r.lng) {
        L.marker([r.lat, r.lng])
            .addTo(map.value)
            .bindPopup(`<b>${r.title}</b><br>${r.description}<br>${r.location}`)
      }
    }

    map.value.flyTo([coords[0], coords[1]], 16, {
      animate: true,
      duration: 1.5
    })

    isOpenModal.value = false
    showFlashMessage('Le signalement a bien été envoyé.')
  } catch (error) {
    console.error('Erreur envoi report :', error)
    alert('Erreur lors du signalement')
  }
}

onMounted(async () => {
  map.value = L.map('map').setView([45.7868175, 4.7958134], 16)

  await fetchReports()

  for (const r of reports.value) {
    if (r.lat && r.lng) {
      L.marker([r.lat, r.lng])
          .addTo(map.value)
          .bindPopup(`<b>${r.title}</b><br>${r.description}<br>${r.location}`)
    }
  }

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors - Guillaume Gorvel'
  }).addTo(map.value)

  map.value.on('click', (e) => {
    console.log('coordonnées', e.latlng)
  })
})

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

</script>

<style>
/* Tu peux ajouter des transitions personnalisées ici si besoin */
</style>
