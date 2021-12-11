<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-16"
          src="../assets/images/logo.png"
          alt="Notepad"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-greyish">
          Edit your profile
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="updateProfile">
        <p v-if="{ errorMessage }" class="text-red-500">{{ errorMessage }}</p>
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="relative mb-4">
            <label for="name-with-label" class="text-gray-700 text-sm">
              Name
            </label>
            <input
              type="text"
              id="name-with-label"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="email"
              placeholder=""
              v-model="username"
            />
          </div>
          <div class="relative mb-4">
            <label for="email-with-label" class="text-gray-700 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email-with-label"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="email"
              placeholder=""
              v-model="email"
            />
          </div>
          <form @submit.prevent="changePassword">
            <h3
              class="pt-12 pb-6 text-center text-xl font-extrabold text-greyish"
            >
              Change password
            </h3>
            <div class="relative pb-4">
              <label
                for="currentPassword-with-label"
                class="text-sm text-gray-700"
              >
                Current password
              </label>
              <input
                type="password"
                id="currentPassword-with-label"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                name="currentPassword"
                placeholder=""
                v-model="currentPassword"
              />
            </div>
            <div class="relative pb-4">
              <label for="newPassword-with-label" class="text-gray-700 text-sm">
                New password
              </label>
              <input
                type="password"
                id="newPassword-with-label"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                name="newPassword"
                placeholder=""
                v-model="newPassword"
              />
            </div>
            <div class="relative pb-4">
              <label
                for="confirmPassword-with-label"
                class="text-gray-700 text-sm"
              >
                Confirm new password
              </label>
              <input
                type="password"
                id="confirmPassword-with-label"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                name="confirmPassword"
                placeholder=""
                v-model="confirmPassword"
              />
            </div>
            <router-link
              class="text-sm underline mt-6 text-center"
              :to="{ name: 'Register' }"
            >
              Forgot password?
            </router-link>
            <button
              type="submit"
              class="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-bluish hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change password
            </button>
          </form>
        </div>
        <button
          type="submit"
          class="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update profile info
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase/index';
import store from '../store/index';
import { ref } from 'vue';
export default {
  setup() {
    const username = ref(null);
    const email = ref(null);
    const errorMessage = ref(null);
    const newPassword = ref(null);
    const confirmPassword = ref(null);

    store.user = supabase.auth.user();
    username.value = store.user.user_metadata.name;
    email.value = store.user.email;
    console.log(store.user);

    const changePassword = async () => {};

    const updateProfile = async () => {};

    return {
      username,
      email,
      errorMessage,
      newPassword,
      confirmPassword,
      changePassword,
      updateProfile,
    };
  },
};
</script>

<style></style>
