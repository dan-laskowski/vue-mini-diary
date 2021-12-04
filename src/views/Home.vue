<template>
  <div class="home">
    <Navigation />
    <h1>Home</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'Home',
  components: {
    Navigation,
  },
};
</script>
