<script setup>
  import useAuthUser from "@/composables/UseAuthUser";
  const { isLoggedIn } = useAuthUser();
</script>
<template>
  <nav class="flex items-center justify-between flex-wrap p-6 border-b-2">
    <div>
      <router-link :to="{ name: 'Home' }">
        <img
          src="https://www.kfum.is/skokassar/wp-content/uploads/sites/8/2019/11/skokassalogo.png"
          alt="Joliskokassalogo"
          width="200"
          height="240"
        />
      </router-link>
    </div>
    <div class="">
      <div class="flex justify-center text-sm lg:flex-grow">
        <router-link
          class="block mt-4 lg:inline-block lg:mt-0 text-lg text-black-200 border-b-4 border-transparent hover:border-gray-600 mx-6"
          :to="{ name: 'Home' }"
        >
          Heim
        </router-link>
        <router-link
          class="block mt-4 lg:inline-block lg:mt-0 text-lg text-black-200 border-b-4 border-transparent hover:border-pink-400 box-border mx-6"
          :to="{ name: 'Girls' }"
        >
          Stelpur
        </router-link>
        <router-link
          class="block mt-4 lg:inline-block lg:mt-0 text-lg text-black-200 border-b-4 border-transparent hover:border-blue-500 box-border mx-6"
          :to="{ name: 'Boys' }"
        >
          Strákar
        </router-link>
        <router-link
          class="block mt-4 lg:inline-block lg:mt-0 text-lg text-black-200 border-b-4 border-transparent hover:border-green-500 box-border mx-6"
          :to="{ name: 'Statistics' }"
        >
          Tölfræði
        </router-link>
      </div>
    </div>
    <div class="flex justify-end" style="width: 200px">
      <div v-if="isLoggedIn()">
        <router-link
          class="inline-block text-md px-6 py-4 leading-none border rounded-lg text-white bg-gray-400 hover:bg-red-500 mt-4 lg:mt-0"
          :to="{ name: 'Logout' }"
        >
          Skrá út
        </router-link>
      </div>
      <div v-else>
        <router-link
          class="inline-block text-md px-6 py-4 leading-none border rounded-lg text-white bg-gray-400 hover:bg-green-500 mt-4 lg:mt-0"
          :to="{ name: 'Login' }"
        >
          Skrá inn
        </router-link>
        <router-link
          class="inline-block text-md px-6 py-4 leading-none border rounded-lg text-white bg-gray-400 hover:bg-green-500 mt-4 lg:mt-0"
          :to="{ name: 'Register' }"
        >
          Ný skráning
        </router-link>
      </div>
    </div>
  </nav>
</template>
