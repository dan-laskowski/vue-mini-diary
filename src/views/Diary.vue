<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans"
  >
    <div class="grid sm:grid-cols-2 sm:gap-14 grid-cols-1 gap-4">
      <div>
        <DatePicker class="font-sans mb-4" v-model="date" />
      </div>
      <div
        class="flex flex-col justify-between border-gray-100 rounded-md border-2"
      >
        <Tiptap v-model="content" @save-content="saveContent" />
      </div>
      <h2>{{ date.getDate() }}</h2>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import Tiptap from '../components/Tiptap.vue';
import { ref } from 'vue';
import store from '../store/index';
import { supabase } from '../supabase/index';
export default {
  name: 'Diary',
  components: { DatePicker, Tiptap },
  setup() {
    const date = ref(new Date());
    const content = ref('');
    const user_id = store.state.user.id;
    console.log(user_id);
    const saveContent = async () => {
      try {
        const { error } = await supabase.from('notes').insert(
          {
            user_id,
            note: content.value,
          },
          { returning: 'minimal' }
        );
        if (error) throw error;
        console.log('note added');
      } catch (error) {
        console.log(error);
      }
    };
    const getData = async () => {
      try {
        const { data: notes, error } = await supabase
          .from('notes')
          .select('*')
          .eq('user_id', user_id);
        if (error) throw error;
        console.log(notes);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    return { date, content, saveContent, getData };
  },
};
</script>

<style></style>
