<template>
  <DatePicker v-model="date" />
  <h2>{{ date.getDate() }}</h2>
</template>

<script>
import { DatePicker } from 'v-calendar';
import { ref } from 'vue';
export default {
  name: 'Diary',
  components: { DatePicker },
  setup() {
    const date = ref(new Date());

    return { date };
  },
};
</script>

<style></style>
