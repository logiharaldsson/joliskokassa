<script setup>
  import useAuthUser from "@/composables/UseAuthUser";
  import { total_boxes, total_gender } from "@/composables/UseData";
  const { isLoggedIn } = useAuthUser();
</script>
<script>
  export default {
    data() {
      return {
        fetchTotalCount: 0,
        fetchTotalGirls: 0,
        fetchTotalBoys: 0,
      };
    },
    async created() {
      await this.getTotalBoxCount("2022");
      await this.getTotalGenderBoxCount("2022", "girls");
      await this.getTotalGenderBoxCount("2022", "boys");
    },
    methods: {
      async getTotalBoxCount(year) {
        total_boxes(year).then((data) => (this.fetchTotalCount = data));
      },
      async getTotalGenderBoxCount(year, gender) {
        total_gender(year, gender).then((data) =>
          gender === "girls"
            ? (this.fetchTotalGirls = data)
            : (this.fetchTotalBoys = data)
        );
      },
    },
  };
</script>
<template>
  <div
    class="flex w-full flex-col py-10 bg-gradient-to-r from-pink-400 to-blue-400"
  >
    <div class="text-4xl text-center text-white pt-10">Jól í skókassa 2022</div>
    <div class="flex justify-center">
      <div class="mx-6">
        <div class="text-4xl text-center text-white mt-10">
          <i class="mt-10 fa-solid fa-gift"></i>
        </div>
        <div class="text-4xl text-center text-white m-6">
          {{ fetchTotalCount }}
        </div>
      </div>
      <div class="mx-6">
        <div class="text-4xl text-center text-white mt-10">
          <i class="mt-10 fa-solid fa-venus"></i>
        </div>
        <div class="text-4xl text-center text-white m-6">
          {{ fetchTotalGirls }}
        </div>
      </div>
      <div class="mx-6">
        <div class="text-4xl text-center text-white mt-10">
          <i class="mt-10 fa-solid fa-mars"></i>
        </div>
        <div class="text-4xl text-center text-white m-6">
          {{ fetchTotalBoys }}
        </div>
      </div>
    </div>
    <div class="m-12"></div>
  </div>
</template>
