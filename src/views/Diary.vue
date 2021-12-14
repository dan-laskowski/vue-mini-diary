<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans"
  >
    <div class="grid grid-cols-2 gap-14">
      <DatePicker class="border-none" v-model="date" />
      <Tiptap />
      <!--<h2>{{ date.getDate() }}</h2> -->
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import Tiptap from '../components/Tiptap.vue';
import { ref } from 'vue';
export default {
  name: 'Diary',
  components: { DatePicker, Tiptap },
  setup() {
    const date = ref(new Date());

    return { date };
  },
};
</script>

<style></style>
