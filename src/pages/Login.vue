<script setup>
  import { h, ref } from "vue";
  import useAuthUser from "@/composables/UseAuthUser";
  import { useRouter } from "vue-router";

  // Use necessary composables
  const router = useRouter();
  const { login, loginWithSocialProvider } = useAuthUser();

  // keep up with form data
  const form = ref({
    email: "",
    password: "",
  });

  // call the proper login method from the AuthUser composable
  // on the submit of the form
  const handleLogin = async (provider) => {
    console.log("here");
    try {
      provider
        ? await loginWithSocialProvider(provider)
        : await login(form.value);
      router.push({ name: "Home" });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
</script>
<template>
  <div class="w-full flex justify-center">
    <div
      class="lg:w-96 md:w-1/3 sm:w-2/4 px-8 py-6 mt-4 text-left bg-gray-200 rounded shadow-lg"
    >
      <h3 class="text-2xl font-bold text-center">Innskráning</h3>
      <form @submit.prevent="handleLogin()">
        <div class="mt-4">
          <div>
            <input
              v-model="form.email"
              type="email"
              name="email"
              placeholder="Netfang"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div class="mt-2">
            <input
              v-model="form.password"
              type="password"
              placeholder="Lykilorð"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div class="flex justify-center">
            <button
              class="px-6 py-2 mt-4 text-white bg-gray-400 rounded-lg hover:bg-green-500"
            >
              Skrá inn
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
