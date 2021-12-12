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
          Sign up to your account
        </h2>
      </div>
      <p v-if="{ statusMessage }" class="text-green-600">{{ statusMessage }}</p>
      <p v-if="{ errorMessage }" class="text-red-500">{{ errorMessage }}</p>

      <form class="mt-8 space-y-6" @submit.prevent="loginUser">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              :class="[linkForm ? 'rounded-md' : 'rounded-t-md']"
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
          <router-link
            v-if="!linkForm"
            class="text-sm underline mt-4 text-center"
            :to="{ name: 'PasswordReset' }"
          >
            Forgot password?
          </router-link>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-bluish hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ linkForm ? `Send me a magic link` : `Sign up` }}
          </button>
        </div>
      </form>

      <div>
        <router-link
          class="text-sm mt-6 text-center"
          :to="{ name: 'Register' }"
        >
          Don't have an account?
          <span class="font-medium text-bluish hover:text-blue-500"
            >Register</span
          >
        </router-link>
      </div>
      <div class="flex items-center">
        <div class="flex-grow bg bg-gray-300 h-0.5"></div>
        <div class="flex-grow-0 mx-5 text dark:text-white">or</div>
        <div class="flex-grow bg bg-gray-300 h-0.5"></div>
      </div>
      <button
        @click="switchForms"
        type="button"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg
            v-if="!linkForm"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </span>
        {{ linkForm ? 'Login with a password' : 'Login with a magic link' }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../supabase/index';
import { useRouter } from 'vue-router';
export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const formValues = {
      email: ref(null),
      password: ref(null),
    };
    const statusMessage = ref(null);
    const errorMessage = ref(null);
    const linkForm = ref(false);

    //Extracting multiple properties by object deconstruction
    const { email, password } = formValues;

    //Login user
    const loginUser = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        !linkForm.value
          ? router.push({ name: 'Diary' })
          : (statusMessage.value = `Magic link send! Check out your inbox`);
      } catch (error) {
        errorMessage.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMessage.value = null;
        }, 5000);
      }
    };

    const switchForms = () => {
      linkForm.value = !linkForm.value;
      password.value = null;
    };

    return {
      email,
      password,
      errorMessage,
      statusMessage,
      loginUser,
      linkForm,
      switchForms,
    };
  },
};
</script>

<style></style>
