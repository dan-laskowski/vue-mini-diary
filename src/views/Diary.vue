<template>
  <div class="grid grid-cols-2">
    <DatePicker v-model="date" />
    <Tiptap />
    <h2>{{ date.getDate() }}</h2>
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
