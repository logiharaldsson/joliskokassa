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
      router.push({ name: "Me" });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
</script>
<template>
  <!-- <div class="flex max-w-lg m-auto">
    <form @submit.prevent="handleLogin()">
      <h1 class="text-3xl mb-5">Login</h1>
      <label>Email <input v-model="form.email" type="email" /></label>
      <label>Password <input v-model="form.password" type="password" /></label>
      <button class="mx-2">Login</button>
      <router-link to="/forgotPassword">Forgot Password?</router-link>
    </form>
    <div class="mt-5">
      <a @click.prevent="handleLogin('github')">Github</a>
    </div>
  </div> -->
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
      <h3 class="text-2xl font-bold text-center">Login to your account</h3>
      <form @submit.prevent="handleLogin()">
        <div class="mt-4">
          <div>
            <input
              v-model="form.email"
              type="email"
              name="email"
              placeholder="Email"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div class="mt-4">
            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div class="flex items-baseline justify-between">
            <button
              class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            >
              Login
            </button>
            <a href="#" class="text-sm text-blue-600 hover:underline"
              >Forgot password?</a
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
