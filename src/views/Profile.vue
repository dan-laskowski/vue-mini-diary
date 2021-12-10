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
          Edit profile
        </h2>
      </div>
      <p v-if="{ statusMessage }" class="text-green-600">{{ statusMessage }}</p>
      <p v-if="{ errorMessage }" class="text-red-500">{{ errorMessage }}</p>

      <form class="mt-8 space-y-6" @submit.prevent="loginUser">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              v-model="username"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              v-model="email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-if="!linkForm"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required="linkForm"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              v-model="password"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-bluish hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            {{ linkForm ? `Send me a magic link` : `Sign up` }}
          </button>
        </div>
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
    store.user = supabase.auth.user();
    const username = ref(null);
    username.value = store.user.user_metadata.name;

    return { username };
  },
};
</script>

<style></style>
