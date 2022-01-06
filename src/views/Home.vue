<template>
  <main class="container mx-auto px-6 flex justify-center relative py-16 my-16">
    <div class="sm:w-2/3 lg:w-2/5 flex flex-col self-center relative z-20">
      <h1
        class="font-Dancing text-5xl sm:text-7xl flex flex-col leading-none text-offwhite mb-4"
      >
        Collect your
        <br />best memories
      </h1>
      <p class="text-sm sm:text-base text-greyish max-w-sm">
        Capture your life and save the best moments in one secure place. Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, inventore!
      </p>
    </div>
    <div class="hidden sm:block sm:w-1/3 lg:w-3/5 relative max-w-xl">
      <img
        src="../assets/images/hero.svg"
        alt="Women is writing on a notepad"
        class="place"
      />
    </div>
  </main>
</template>

<script>
export default {
  name: 'Home',
};
</script>
