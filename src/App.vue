<script setup>
  import AppHeaderVue from "./components/AppHeader.vue";
</script>

<template>
  <AppHeaderVue />
  <div class="max-w-7xl pt-10 m-auto">
    <router-view />
  </div>
</template>
