<script setup>
  import AppHeaderVue from "./components/AppHeader.vue";
</script>

<template>
  <AppHeaderVue />
  <!-- <div class="max-w-7xl pt-10 m-4"> -->
  <div class="pt-10 m-4">
    <router-view />
  </div>
</template>
