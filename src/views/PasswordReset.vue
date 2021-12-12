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
        <h2 class="mt-6 text-center text-xl font-extrabold text-greyish">
          Reset you password
        </h2>
        <p class="text-greyish text-sm text-center mt-2">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>
      <p v-if="statusMessage" class="text-green-600">{{ statusMessage }}</p>
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

      <form class="mt-8 space-y-6" @submit.prevent="resetPassword">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="mb-4">
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              v-model="email"
            />
          </div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-bluish hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset your password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase/index';
import { ref } from 'vue';
export default {
  name: 'PasswordReset',
  setup() {
    const email = ref(null);
    const statusMessage = ref(null);
    const errorMessage = ref(null);

    const resetPassword = async () => {
      try {
        const { error } = await supabase.auth.api.resetPasswordForEmail(
          email.value
        );
        console.log(error);
        if (error) throw error;
        statusMessage.value =
          'We send you password reset link. Check your inbox.';
        setTimeout(() => {
          statusMessage.value = null;
        }, 5000);
      } catch (error) {
        errorMessage.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMessage.value = null;
        }, 5000);
      }
    };

    return { email, errorMessage, statusMessage, resetPassword };
  },
};
</script>
