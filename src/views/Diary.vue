<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans"
  >
    <div class="grid sm:grid-cols-2 sm:gap-14 grid-cols-1 gap-4">
      <div>
        <DatePicker class="border-none mb-4" v-model="date" />
      </div>
      <div class="flex flex-col justify-between">
        <Tiptap v-model="content" />
        <!-- <button
          type="button"
          class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Save a note
        </button> -->
      </div>
      <h2>{{ date.getDate() }}</h2>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import Tiptap from '../components/Tiptap.vue';
import { ref } from 'vue';
// import { supabase } from '../supabase/index';
export default {
  name: 'Diary',
  components: { DatePicker, Tiptap },
  setup() {
    const date = ref(new Date());
    const content = ref('');
    return { date, content };
  },
};
</script>

<style></style>
