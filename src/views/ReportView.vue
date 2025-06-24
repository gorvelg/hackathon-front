<template>
<!--  <div v-for="r in reports" :key="r['@id']">-->
<!--    <p>{{ r.title }} — {{ r.location }}</p>-->
<!--  </div>-->

  <!-- Formulaire -->
  <div
      @click="openModal"
      class="cursor-pointer fixed bottom-8 right-8 rounded-full bg-[#8C9F82] text-white flex border-2 border-white h-12 w-12 justify-center items-center p-4 shadow-lg z-9999"
  >
    <font-awesome-icon icon="flag" />
  </div>
  <div
      v-if="isOpenModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-9999"
  >

      <form
          @submit.prevent="submitReport"
          class="w-full lg:w-1/2 bg-white shadow-md border border-gray-200 rounded-xl p-6 space-y-5 mt-8 sm:mt-20 mb-20 relative"
          id="reportForm"
      >
        <!-- Champs du formulaire -->
        <div>
          <button
              @click="isOpenModal = false"
              class="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            ✕
          </button>
          <label class="block text-left font-medium mb-1 text-gray-700">Titre</label>
          <input
              v-model="report.title"
              type="text"
              class="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm"
              placeholder="Ex: Lampadaire défectueux"
              required
          />
        </div>

        <div>
          <label class="block text-left font-medium mb-1 text-gray-700">Type</label>
          <select
              v-model="report.type"
              class="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
              required
          >
            <option disabled value="">Sélectionner un type</option>
            <option>Nid-de-poule</option>
            <option>Lampadaire</option>
            <option>Voirie</option>
            <option>Autre</option>
          </select>
        </div>

        <div>
          <label class="block text-left font-medium mb-1 text-gray-700">Localisation</label>
          <input
              v-model="report.location"
              type="text"
              class="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm"
              placeholder="Ex: Rue de Paris, 75000"
          />
        </div>

        <div>
          <label class="block text-left font-medium mb-1 text-gray-700">Description</label>
          <textarea
              v-model="report.description"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Détaillez ici votre signalement"
          ></textarea>
        </div>

        <button
            type="submit"
            class="w-full bg-[#2D2D2D] text-white py-2 rounded-full hover:bg-black transition"
        >
          Envoyer le signalement
        </button>
      </form>

  </div>


  <div id="map"></div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {api} from "@/services/api.js";

const report = ref({
  title: '',
  type: '',
  location: '',
  description: '',
})

const reports = ref([])

const isOpenModal = ref(false)

function openModal() {
  isOpenModal.value = true
}

async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  const response = await fetch(url)
  const data = await response.json()
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
  }
  return null
}

async function testGeocode() {
  const coords = await geocodeAddress('40 rue de Vienne, 10300')
  console.log('coordonnées', coords[0], coords[1])
}

testGeocode()

const fetchReports = async () => {
  try {
    const res = await api('/api/reports',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/ld+json',
        Accept: 'application/ld+json'
      },
    })
    reports.value = res.member || []
  } catch (e) {
    console.error('Erreur chargement des signalements', e)
  }
}


const submitReport = async () => {
  try {
    let jsonBody = report.value;
    jsonBody.geocoding = (await geocodeAddress(report.value.location));
    jsonBody.lat = jsonBody.geocoding[0];
    jsonBody.lng = jsonBody.geocoding[1];

    await api('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
        Accept: 'application/ld+json'
      },
      body: JSON.stringify(jsonBody),
    })

    report.value = {
      title: '',
      type: '',
      location: '',
      description: '',
      lat: '',
      lng: ''
    }
  } catch(error){
    console.error('Erreur envoi report :', error)
    alert('Erreur lors du signalement')
  }
}

onMounted(async () => {
  const map = L.map('map').setView([48.297520, 4.074710], 13)

  await fetchReports();

  for (const r of reports.value) {
    if (r.lat && r.lng) {
      L.marker([r.lat, r.lng])
          .addTo(map)
          .bindPopup(`<b>${r.title}</b><br>${r.description}<br>${r.location}`)
    }
  }



  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors - Guillaume Gorvel'
  }).addTo(map)

  map.on('click', (e) => {
    console.log('coordonnées', e.latlng)
  })

})
</script>

<style>
#map {
  height: calc(100vh - 56px);
  width: 100%;
}
</style>
