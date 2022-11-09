<script>
  // import JisDataServices from "../services/JisDataServices";
  // import Swal from "sweetalert2";
  //   import dayjs from "dayjs";
  //   import isToday from "dayjs/plugin/isToday";
  //   import isYesterday from "dayjs/plugin/isYesterday";
  //   import HistoryTable from "../components/HistoryTable.vue";
  //   dayjs.extend(isToday);
  //   dayjs.extend(isYesterday);
  import { total_group_gender } from "@/composables/UseData";

  export default {
    // components: { HistoryTable },
    data() {
      return {
        currentUser: "logi",
        allBoxes: [],
        boys: [],
        girls: [],
        ages: ["1-2", "3-6", "7-10", "11-14", "15+"],
      };
    },
    async beforeCreate() {
      this.allBoxes = await total_group_gender("2022");
      this.modBox("girls");
      this.modBox("boys");
    },
    computed: {},
    methods: {
      modBox(gender) {
        console.log("gender:", gender);
        console.log("this.allBoxes:", this.allBoxes);
        const ages = ["1-2", "3-6", "7-10", "11-14", "15+"];
        if (gender === "boys") {
          let genderBoxes = this.allBoxes.filter((el) => el.gender === gender);
          console.log("girls", genderBoxes);
          ages.forEach((age) =>
            this.boys.push(genderBoxes.find((box) => box.box_abe === age).sum)
          );
        } else if (gender === "girls") {
          let genderBoxes = this.allBoxes.filter((el) => el.gender === gender);
          ages.forEach((age) =>
            this.girls.push(genderBoxes.find((box) => box.box_abe === age).sum)
          );
        }
        return true;
      },
    },
  };
</script>
<template>
  <div class="text-center fw-bold text-4xl mb-10">
    Fjöldi kassa eftir kyni og aldri
  </div>
  <div class="grid grid-cols-5 gap-5">
    <div v-for="(box, index) in girls" :key="index + 'girls'">
      <div class="flex justify-center text-2xl my-2">
        Stelpur {{ ages[index] }}
      </div>
      <div class="flex justify-center">
        <div
          class="relative h-60 w-44 xs:w-80 mx-3 flex-col justify-center bg-pink-300 rounded-lg shadow-xl shadow-slate-300/60"
        >
          <!-- Counter -->
          <div
            class="flex justify-center items-center px-7 pt-9 pb-2 mx-7 mt-5"
          >
            <p class="text-6xl text-center text-white mt-8">
              {{ box }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-5 gap-5 pt-4 mt-4">
    <div v-for="(box, index) in boys" :key="index + 'girls'">
      <div class="flex justify-center text-2xl my-2">
        Strákar {{ ages[index] }}
      </div>
      <div class="flex justify-center">
        <div
          class="relative h-60 w-44 xs:w-80 mx-3 flex-col justify-center bg-blue-300 rounded-lg shadow-xl shadow-slate-300/60"
        >
          <!-- Counter -->
          <div
            class="flex justify-center items-center px-7 pt-9 pb-2 mx-7 mt-5"
          >
            <p class="text-6xl text-center text-white mt-8">
              {{ box }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
