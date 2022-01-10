<template>
  <nav>
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center">
        <div>
          <router-link
            class="text-offwhite font-Dancing no-underline hover:no-underline text-3xl lg:text-5xl"
            :to="{ name: 'Home' }"
          >
            <h2 class="font-Dancing text-offwhite text-5xl">Diary</h2>
          </router-link>
        </div>
        <div
          class="flex font-Dancing text-2xl items-center space-x-1 text-offwhite"
        >
          <router-link
            v-if="!user"
            class="transition py-5 px-3 hover:text-indigo-200"
            :to="{ name: 'Register' }"
            >Signup</router-link
          >
          <router-link
            v-if="!user"
            class="transition py-5 px-3 hover:text-indigo-200"
            :to="{ name: 'Login' }"
            ><p>Login</p></router-link
          >
          <p
            v-if="user"
            class="transition py-5 px-3 hover:text-indigo-200 cursor-pointer"
            @click="handleLogout"
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import store from '../store/index';
import { computed } from 'vue';
import { handleLogout } from '../vuetils/useAuth';
// import { useRouter } from 'vue-router';
// import { supabase } from '../supabase/index';
export default {
  name: 'Navigation',
  setup() {
    const user = computed(() => store.state.user);

    // const router = useRouter();

    // const logout = () => {
    //   supabase.auth.signOut();
    //   // console.log(user);
    //   router.push({ name: 'Home' });
    // };

    return { handleLogout, user };
  },
};
</script>
