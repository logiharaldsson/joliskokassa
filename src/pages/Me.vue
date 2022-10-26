<script setup>
  import useAuthUser from "@/composables/UseAuthUser";
  import useSupabase from "@/composables/UseSupabase";
  // import { useData } from "@/composables/UseData";
  import { getBoxName } from "@/composables/UseData";
  import { defineComponent, onMounted } from "@vue/runtime-core";

  const { user } = useAuthUser();
  const { supabase } = useSupabase();
  // const { getTitles } = useMouse();
  console.log("fire");

  // export default {
  //   async setup() {
  //     let a = [];
  //     const books = await useMouse().then((data) => (a = data));

  //     // expose to template and other options API hooks
  //     return {
  //       a,
  //       books,
  //       user,
  //       useMouse,
  //     };
  //   },

  //   mounted() {
  //     console.log(this.books); // 0
  //     console.log(this.a); // 0
  //   },
  // };
</script>
<script>
  export default {
    data() {
      return {
        titles: [],
        authors: [],
        boxNames: [],
        currentBoxInfo: { gender: "", age: "", boxNumber: "", year: "" },
      };
    },
    async onMounted() {
      this.getBoxName().then(
        (data) => (this.boxNames = data.map((name) => name.name))
      );
    },
    methods: {
      fetchTitles() {
        this.getBoxName().then(
          (data) => (this.boxNames = data.map((name) => name.name))
        );
        // this.titles = books.map((title) => title.title);
      },

      fetchAuthors() {
        this.getAuthors().then(
          (data) => (this.authors = data.map((author) => author.author))
        );
        // this.titles = books.map((title) => title.title);
      },
    },
    computed: {
      // a computed getter
      publishedBooksMessage() {
        // `this` points to the component instance
        return this.author.books.length > 0 ? "Yes" : "No";
      },
    },
  };
</script>

<template>
  <div v-if="user">
    <div>Hello {{ user.email }}</div>
    <button @click="fetchTitles">Get titles</button>
    <button @click="fetchAuthors">Get authors</button>
    <button @click="fetchBoxInfo">Get box info</button>
    <div>Box names: {{ boxNames }}</div>
    <div>Box names: {{ boxNames }}</div>
  </div>
</template>
