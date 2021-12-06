<template>
  <div v-if="appReady" class="min-h-full font-Taviraj box-border">
    <router-view />
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from './supabase/index';
import store from './store/index';
export default {
  setup() {
    const appReady = ref(null);

    const user = supabase.auth.user();

    if (!user) {
      appReady.value = true;
    }

    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session);
      appReady.value = true;
    });

    return { appReady };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Taviraj:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
</style>
