<template>
  <nav id="header" class="w-full z-30 top-0 text-white">
    <div
      class="w-full container mx-auto flex flex-wrap font-taviraj items-center justify-between mt-0 py-2 mb-12"
    >
      <div class="pl-4 flex items-center">
        <router-link
          class="toggleColour text-greyish no-underline hover:no-underline text-2xl lg:text-4xl"
          :to="{ name: 'Home' }"
        >
          Diary
        </router-link>
      </div>
      <div class="block lg:hidden pr-4">
        <button
          id="nav-toggle"
          class="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          <svg
            class="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <router-link
              class="inline-block text-grayish no-underline hover:text-greyish hover:text-underline py-2 px-4"
              :to="{ name: 'Register' }"
              >Sign up</router-link
            >
          </li>
        </ul>
        <router-link
          id="navAction"
          :to="{ name: 'Login' }"
          class="mx-auto lg:mx-0 hover:underline bg-white text-grayish rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          Sign in
        </router-link>
      </div>
    </div>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    msg: String,
  },
};
</script>
