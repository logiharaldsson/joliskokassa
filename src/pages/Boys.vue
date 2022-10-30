<script setup>
  import useAuthUser from "@/composables/UseAuthUser";
  import useSupabase from "@/composables/UseSupabase";
  import {
    getBoxName,
    incrementBox,
    getAllBoxesCategory,
    logAction,
    getHistoryLog,
    total_boxes,
  } from "@/composables/UseData";

  const { user } = useAuthUser();

  const { supabase } = useSupabase();
</script>
<script>
  import {
    getBoxName,
    getAllBoxesCategory,
    createGiantBox,
    logAction,
    getHistoryLog,
    total_boxes,
  } from "@/composables/UseData";

  export default {
    data() {
      return {
        ages: ["1-2 ára", "3-6 ára", "7-10 ára", "11-14 ára", "15+ ára"],
        agesCategories: ["1-2", "3-6", "7-10", "11-14", "15+"],
        ageIndex: 0,
        genderCategories: ["stelpur", "strákar"],
        genderDBCategories: ["girls", "boys"],
        genderIndex: 1,
        fetchData: null,
        fetchBoxNumber: null,
        fetchBoxCounter: 0,
        supabaseBoxCounter: 0,
        currentUser: "logi",
        fetchAvailableGiantBoxes: [],
        boxIndex: 0,
        historyLogs: [],
        historyLogsIce: [],
        historyLogsString: "",
        historyLogsIceCopy: [],
        sbBoxCounters: [],
        historyTable: "",
        fetchTotalCount: 0,
      };
    },
    async created() {
      // await this.getHistory();
      await this.fetchAllBoxes("boys", "1-2", "2022");
      const { data, table } = await getHistoryLog();
      this.historyTable = table;
      await this.getTotalBoxCount("2022");
    },
    computed: {
      isMobile() {
        return window.innerWidth < 520;
      },
      currentGender() {
        return this.genderCategories[this.genderIndex];
      },
      currentAge() {
        return this.ages[this.ageIndex];
      },
      currentDbGender() {
        return this.genderDBCategories[this.genderIndex];
      },
      currentDbAge() {
        return this.agesCategories[this.ageIndex];
      },
      currentCount() {
        return this.sbBoxCounters[this.boxIndex];
      },
    },
    methods: {
      async updateBoxCounter(increment, gender, age, boxNumber, year) {
        await incrementBox(increment, gender, age, boxNumber, year).then(
          (data) => (this.sbBoxCounters[this.boxIndex] = data)
        );
        const { data, table } = await getHistoryLog();
        this.historyTable = table;
        await this.getTotalBoxCount("2022");
      },
      async fetchAllBoxes(gender, age, year) {
        await getAllBoxesCategory(gender, age, year)
          .then((data) => {
            this.sbBoxCounters = data;
          })
          .then(() => (this.boxIndex = this.sbBoxCounters.length - 1));
        await this.getTotalBoxCount("2022");
      },
      async getTotalBoxCount(year) {
        total_boxes(year).then((data) => (this.fetchTotalCount = data));
      },
      addToBox(increment) {
        const boxBodyData = {
          gender: this.currentDbGender,
          age: this.currentDbAge,
          box_number: this.boxIndex + 1,
          increment: increment,
        };
        JisDataServices.addToBox(JSON.stringify(boxBodyData))
          .then((response) => {
            this.fetchBoxCounter = response.data;
            this.fetchAvailableGiantBoxes[this.boxIndex] = response.data;
          })
          .then(() => this.getHistory());
      },
      async getHistory() {
        JisDataServices.getHistory()
          .then((response) => {
            console.log("history response", response.data);
            this.historyLogs = [];
            response.data.forEach((log) => {
              this.historyLogs.push(log);
            });
          })
          .then(
            () => (this.historyLogsString = JSON.stringify(this.historyLogs))
          );
      },
      async tallyButton(number) {
        await this.updateBoxCounter(
          number,
          this.currentDbGender,
          this.currentDbAge,
          this.boxIndex + 1,
          "2022"
        );
      },
      async addGiantBox() {
        Swal.fire({
          title: "Viltu búa til nýjan trölla kassa?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#22C55E",
          cancelButtonColor: "#EF4444",
          cancelButtonText: "Nei ekki núna",
          confirmButtonText: "Já endilega!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log("swal ok");
            try {
              const data = await createGiantBox(
                this.currentDbGender,
                this.currentDbAge,
                "2022"
              );
              console.log("add giant box:", data);
              this.fetchAllBoxes(
                this.currentDbGender,
                this.currentDbAge,
                "2022"
              );
              const { d, table } = await getHistoryLog();
              this.historyTable = table;
            } catch (error) {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Villa kom upp",
                text: "Ekki tókst að búa til nýjan tröllakassa!",
                footer:
                  '<a href="mailto: logiharaldss@gmail.com">Hafa samband - logiharaldss@gmail.com</a>',
              });
            }
          }
        });
      },
      async ageButton(number) {
        this.fetchAllBoxes("boys", this.agesCategories[number], "2022");
        this.ageIndex = number;
      },
      changeBoxIndex(newIndex) {
        this.boxIndex = newIndex;
      },
    },
    watch: {
      historyTable(newValue) {
        const table = document.getElementById("historyTable");
        table.innerHTML = newValue;
      },
    },
  };
</script>

<template>
  <!-- Total count -->
  <div class="absolute right-0">
    <div class="mr-6 pr-6 text-5xl">
      <h1><i class="mt-10 fa-solid fa-gift"></i> {{ fetchTotalCount }}</h1>
    </div>
  </div>
  <!-- Sidebar -->
  <div class="flex flex-col absolute z-20">
    <button
      v-for="(age, index) in agesCategories"
      @click="ageButton(index)"
      :class="{
        'bg-blue-400': index === ageIndex,
        'text-white': index === ageIndex,
      }"
      class="target:bg-blue-200 sidebar-item border rounded p-2 m-2 w-36 h-16 text-center shadow-xl hover:bg-blue-300 hover:text-white"
      :key="`age-${index}`"
      :id="`${age}`"
    >
      {{ age }} ára
    </button>
  </div>
  <!-- Tally container -->
  <div class="w-screen flex flex-col sm:items-center items-end">
    <!-- Gender/age text title -->
    <div class="relative w-3/5 mr-6 sm:mr-0 flex justify-center text-2xl my-2">
      Stelpur {{ currentAge }}
    </div>
    <!-- Tally box -->
    <div class="flex">
      <div class="flex flex-col justify-center minus-buttons tally-button mr-2">
        <button
          v-if="!isMobile"
          class="text-white rounded p-2 my-2 bg-red-500"
          @click="tallyButton(-1)"
        >
          -1
        </button>
        <button
          v-if="!isMobile"
          class="text-white rounded p-2 my-2 bg-red-500"
          @click="tallyButton(-5)"
        >
          -5
        </button>
      </div>
      <div
        class="relative h-60 w-44 xs:w-80 mx-3 flex-col justify-center bg-blue-300 rounded-lg shadow-xl shadow-slate-300/60"
      >
        <!-- Counter -->
        <div class="flex justify-center items-center px-7 pt-9 pb-2 mx-7 mt-5">
          <p class="text-6xl text-center text-white mt-8">
            {{ currentCount }}
          </p>
        </div>
      </div>
      <div
        :class="{ 'mr-2': isMobile }"
        class="flex flex-col justify-center minus-buttons tally-button ml-2"
      >
        <button
          v-if="isMobile"
          class="text-white rounded p-2 my-2 bg-red-500"
          @click="tallyButton(-1)"
        >
          -1
        </button>
        <button
          v-if="isMobile"
          class="text-white rounded p-2 my-2 bg-red-500"
          @click="tallyButton(-5)"
        >
          -5
        </button>
        <button
          class="text-white rounded p-2 my-2 bg-green-500"
          @click="tallyButton(1)"
        >
          +1
        </button>
        <button
          class="text-white rounded p-2 my-2 bg-green-500"
          @click="tallyButton(5)"
        >
          +5
        </button>
      </div>
    </div>
    <div
      class="relative sm:w-80 w-3/5 mr-6 sm:mr-0 flex justify-center text-2xl my-2"
    >
      Kassi #{{ boxIndex + 1 }}
    </div>
    <div class="relative mr-6 sm:mr-0 flex justify-center my-2">
      <button
        @click="addGiantBox()"
        class="m-1 p-2 border shadow-xl rounded hover:bg-gray-400 hover:text-white"
      >
        Búa til kassa
      </button>

      <button
        v-for="(giantBox, index) in sbBoxCounters"
        @click="changeBoxIndex(index)"
        :key="giantBox + index"
        :class="{
          'bg-blue-400': index === boxIndex,
          'text-white': index === boxIndex,
        }"
        class="m-1 p-2 px-4 border shadow-xl rounded hover:bg-blue-300 hover:text-white"
      >
        {{ index + 1 }}
      </button>
    </div>
    <div class="mt-2">
      <div class="grid grid-cols-6">
        <div class="text-center p-2 border-b-4 border-gray-500">Kyn</div>
        <div class="text-center p-2 border-b-4 border-gray-500">Aldur</div>
        <div class="text-center p-2 border-b-4 border-gray-500">Kassi #</div>
        <div class="text-center p-2 border-b-4 border-gray-500">Aðgerð</div>
        <div class="text-center p-2 border-b-4 border-gray-500">Staða</div>
        <div class="text-center p-2 border-b-4 border-gray-500">Tími</div>
      </div>
      <div id="historyTable" class="w-full"></div>
    </div>
  </div>
</template>

<style></style>
