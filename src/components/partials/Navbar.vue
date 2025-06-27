<template>
  <header class="bg-[#003787] text-white shadow-lg absolute inset-x-0 top-0 z-9999 hidden md:block">
    <ul class="flex justify-between items-center p-4">
      <div class="heading">
        <RouterLink to="/">Polygone's</RouterLink>
      </div>
      <div  class="flex gap-4">
          <RouterLink :to="{name:'report'}" active-class="font-bold text-[#a8cbff]" class="flex-shrink-0:">Signalements</RouterLink>
          <RouterLink :to="{name: 'blog'}" active-class="font-bold text-[#a8cbff]" class="flex-shrink-0">ActuVerte</RouterLink>
          <RouterLink :to="{name: 'forum'}" active-class="font-bold text-[#a8cbff]" class="flex-shrink-0">Forum</RouterLink>
      </div>
      <div class="" v-if="isLoggedIn">
        <button @click="logout">Se déconnecter</button>
      </div>
      <div class="" v-else>
        <RouterLink :to="{name: 'login'}" active-class="font-bold text-[#a8cbff]" class="flex-shrink-0">Connexion/Inscription</RouterLink>
      </div>
    </ul>
  </header>

<!--  Responsive -->
  <header class="bg-white text-[#3781B0] shadow-lg absolute inset-x-0 bottom-0 z-9999 md:hidden">
    <ul class="p-4">
      <div class="flex justify-between gap-4">
        <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
            <g clip-path="url(#clip0_241_905)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.87616 18.462H31.6504V0.7661H6.87616V18.462ZM0.682617 30.2592H3.77939V0.7661H0.682617V30.2592Z" fill="#3781B0"/>
            </g>
            <defs>
              <clipPath id="clip0_241_905">
                <rect width="30.9677" height="30.9677" fill="white" transform="translate(0.682617)"/>
              </clipPath>
            </defs>
          </svg>
          <RouterLink :to="{name:'report'}" active-class="font-bold text-[#a8cbff]" class="flex-shrink-0 text-xs sm:text-base">Signalements</RouterLink>
        </div>

        <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
            <g clip-path="url(#clip0_241_888)">
              <path d="M27.9297 2.68108H4.7039C4.36168 2.68108 4.03348 2.81702 3.7915 3.059C3.54952 3.30098 3.41357 3.62918 3.41357 3.9714V27.1972C3.41357 27.5394 3.54952 27.8676 3.7915 28.1096C4.03348 28.3516 4.36168 28.4875 4.7039 28.4875H27.9297C28.2719 28.4875 28.6001 28.3516 28.8421 28.1096C29.0841 27.8676 29.22 27.5394 29.22 27.1972V3.9714C29.22 3.62918 29.0841 3.30098 28.8421 3.059C28.6001 2.81702 28.2719 2.68108 27.9297 2.68108ZM8.57486 10.423C8.57486 10.0808 8.71081 9.7526 8.95279 9.51061C9.19477 9.26863 9.52297 9.13269 9.86519 9.13269H13.7362C14.0784 9.13269 14.4066 9.26863 14.6485 9.51061C14.8905 9.7526 15.0265 10.0808 15.0265 10.423V15.5843C15.0265 15.9265 14.8905 16.2547 14.6485 16.4967C14.4066 16.7387 14.0784 16.8746 13.7362 16.8746H9.86519C9.52297 16.8746 9.19477 16.7387 8.95279 16.4967C8.71081 16.2547 8.57486 15.9265 8.57486 15.5843V10.423ZM22.7684 22.0359H9.86519C9.52297 22.0359 9.19477 21.9 8.95279 21.658C8.71081 21.416 8.57486 21.0878 8.57486 20.7456C8.57486 20.4034 8.71081 20.0752 8.95279 19.8332C9.19477 19.5912 9.52297 19.4553 9.86519 19.4553H22.7684C23.1106 19.4553 23.4388 19.5912 23.6808 19.8332C23.9228 20.0752 24.0587 20.4034 24.0587 20.7456C24.0587 21.0878 23.9228 21.416 23.6808 21.658C23.4388 21.9 23.1106 22.0359 22.7684 22.0359ZM22.7684 16.8746H18.8974C18.5552 16.8746 18.227 16.7387 17.985 16.4967C17.7431 16.2547 17.6071 15.9265 17.6071 15.5843C17.6071 15.2421 17.7431 14.9139 17.985 14.6719C18.227 14.4299 18.5552 14.294 18.8974 14.294H22.7684C23.1106 14.294 23.4388 14.4299 23.6808 14.6719C23.9228 14.9139 24.0587 15.2421 24.0587 15.5843C24.0587 15.9265 23.9228 16.2547 23.6808 16.4967C23.4388 16.7387 23.1106 16.8746 22.7684 16.8746ZM22.7684 11.7133H18.8974C18.5552 11.7133 18.227 11.5774 17.985 11.3354C17.7431 11.0934 17.6071 10.7652 17.6071 10.423C17.6071 10.0808 17.7431 9.7526 17.985 9.51061C18.227 9.26863 18.5552 9.13269 18.8974 9.13269H22.7684C23.1106 9.13269 23.4388 9.26863 23.6808 9.51061C23.9228 9.7526 24.0587 10.0808 24.0587 10.423C24.0587 10.7652 23.9228 11.0934 23.6808 11.3354C23.4388 11.5774 23.1106 11.7133 22.7684 11.7133Z" fill="#3781B0"/>
            </g>
            <defs>
              <clipPath id="clip0_241_888">
                <rect width="30.9677" height="30.9677" fill="white" transform="translate(0.349609)"/>
              </clipPath>
            </defs>
          </svg>
          <RouterLink :to="{name: 'blog'}" active-class="font-bold text-[#a8cbff]" class="flex-shrink-0 text-xs sm:text-base">ActuVerte</RouterLink>
        </div>

        <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <g clip-path="url(#clip0_241_879)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.8254 -2.09808e-05V21.9349H16.3625L7.32774 30.9696V21.9349H0.0161133V-2.09808e-05H26.8254ZM14.6418 12.1863H7.32772V14.0819H14.6418L14.6418 12.1863ZM19.5138 7.30941H7.32772V9.20504H19.5138V7.30941H19.5138Z" fill="#3781B0"/>
            </g>
            <defs>
              <clipPath id="clip0_241_879">
                <rect width="30.9677" height="30.9677" fill="white" transform="translate(0.0161133)"/>
              </clipPath>
            </defs>
          </svg>
          <RouterLink :to="{name: 'forum'}" active-class="font-bold text-[#a8cbff]" class="flex-shrink-0 text-xs sm:text-base">Forum</RouterLink>
        </div>

        <div class="flex flex-col items-center" v-if="isLoggedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27" fill="none">
            <path d="M4.16129 21.2275H6.74212V23.8083H22.2271V3.16164H6.74212V5.74248H4.16129V1.87123C4.16129 1.52899 4.29724 1.20076 4.53924 0.958765C4.78124 0.716765 5.10947 0.580811 5.45171 0.580811H23.5175C23.8598 0.580811 24.188 0.716765 24.43 0.958765C24.672 1.20076 24.808 1.52899 24.808 1.87123V25.0987C24.808 25.441 24.672 25.7692 24.43 26.0112C24.188 26.2532 23.8598 26.3891 23.5175 26.3891H5.45171C5.10947 26.3891 4.78124 26.2532 4.53924 26.0112C4.29724 25.7692 4.16129 25.441 4.16129 25.0987V21.2275ZM6.74212 12.1946H15.775V14.7754H6.74212V18.6466L0.290039 13.485L6.74212 8.32331V12.1946Z" fill="#3781B0"/>
          </svg>
          <button class="text-xs sm:text-base" @click="logout">Déconnexion</button>
        </div>
        <div class="flex flex-col items-center" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <g clip-path="url(#clip0_439_877)">
              <path d="M6.45253 28.3891C6.11029 28.3891 5.78206 28.2532 5.54006 28.0112C5.29806 27.7692 5.16211 27.441 5.16211 27.0987V3.87123C5.16211 3.52899 5.29806 3.20076 5.54006 2.95876C5.78206 2.71676 6.11029 2.58081 6.45253 2.58081H24.5184C24.8606 2.58081 25.1888 2.71676 25.4308 2.95876C25.6728 3.20076 25.8088 3.52899 25.8088 3.87123V7.74248H23.2279V5.16164H7.74294V25.8083H23.2279V23.2275H25.8088V27.0987C25.8088 27.441 25.6728 27.7692 25.4308 28.0112C25.1888 28.2532 24.8606 28.3891 24.5184 28.3891H6.45253ZM23.2279 20.6466V16.7754H14.195V14.1946H23.2279V10.3233L29.68 15.485L23.2279 20.6466Z" fill="#3781B0"/>
            </g>
            <defs>
              <clipPath id="clip0_439_877">
                <rect width="30.97" height="30.97" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <RouterLink :to="{name: 'login'}" active-class="font-bold text-[#a8cbff]" class="flex-shrink-0 text-xs sm:text-base">Connexion</RouterLink>
        </div>
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