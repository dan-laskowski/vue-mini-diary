<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans"
  >
    <div class="grid sm:grid-cols-2 sm:gap-14 grid-cols-1 gap-4">
      <div>
        <DatePicker @click="getDayNote" class="font-sans mb-4" v-model="date" />
      </div>
      <div
        class="flex flex-col justify-between border-gray-100 rounded-md border-2"
      >
        <Tiptap v-model="content" @save-content="saveContent" />
      </div>
      <h2>
        {{ `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` }}
      </h2>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import Tiptap from '../components/Tiptap.vue';
import { ref } from 'vue';
import store from '../store/index';
import { supabase } from '../supabase/index';
import moment from 'moment';
export default {
  name: 'Diary',
  components: { DatePicker, Tiptap },
  setup() {
    const date = ref(new Date());
    const content = ref('');
    const user_id = store.state.user.id;
    console.log(moment().format());
    const saveContent = async () => {
      try {
        const { error } = await supabase.from('notes').insert(
          {
            user_id,
            note: content.value,
            inserted_at: moment().format('L'),
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
          .select('note')
          .eq('user_id', user_id);
        if (error) throw error;
        console.log(notes);
        content.value = notes[0].note;
      } catch (error) {
        console.log(error);
      }
    };

    const getDayNote = async () => {
      try {
        const { data: note, error } = await supabase
          .from('notes')
          .select('note')
          .eq('user_id', user_id)
          .eq(
            'inserted_at',
            `${
              date.value.getMonth() + 1
            }/${date.value.getDate()}/${date.value.getFullYear()}`
          );
        if (error) throw error;
        content.value = note.length ? note[0].note : 'brak';
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    return { date, content, saveContent, getData, getDayNote };
  },
};
</script>

<style></style>
