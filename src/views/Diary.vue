<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans"
  >
    <div class="flex flex-col grow justify-items-center items-center max-w-2xl">
      <div class="flex flex-row justify-between">
        <div class="max-w-xs">
          <DatePicker
            :max-date="new Date()"
            @click="getNote"
            class="font-Maven mb-8 shadow-md"
            v-model="date"
            :attributes="attributes"
            is-expanded
          />
        </div>
        <h2
          class="self-center text-center font-Dancing text-offwhite text-5xl max-w-xs"
        >
          Hello {{ username }}, how was your day?
        </h2>
      </div>
      <div
        class="flex flex-col w-full justify-between border-gray-100 bg-gray-100 rounded-md border-2 shadow-md"
      >
        <Tiptap
          v-model="content"
          @save-content="setNote"
          :isLoading="isLoading"
          :isEditable="isEditable"
        />
      </div>
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
    const isLoading = ref(false);
    const isEditable = ref('');
    const date = ref(new Date());
    const currentDate = moment().format('l');

    const content = ref('');
    const dates = ref([]);
    const attributes = ref([
      {
        dot: 'purple',
        dates: dates,
      },
    ]);
    const user_id = store.state.user.id;
    const username = store.state.user.user_metadata.name;
    const setNote = async () => {
      try {
        isLoading.value = true;
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
        if (!note.length) {
          try {
            const { error } = await supabase.from('notes').insert(
              {
                user_id,
                note: content.value,
                inserted_at: moment().format('l'),
              },
              { returning: 'minimal' }
            );
            if (error) throw error;
            getDots();
            console.log('note added');
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const { error } = await supabase
              .from('notes')
              .update({
                note: content.value,
              })
              .eq('user_id', user_id)
              .eq(
                'inserted_at',
                `${
                  date.value.getMonth() + 1
                }/${date.value.getDate()}/${date.value.getFullYear()}`
              );

            if (error) throw error;
            console.log('note updated');
          } catch (error) {
            console.log(error);
          }
        }
        isLoading.value = false;
      } catch (error) {
        console.log(error.message);
      }
    };

    const getNote = async () => {
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
        isEditable.value =
          currentDate ==
          `${
            date.value.getMonth() + 1
          }/${date.value.getDate()}/${date.value.getFullYear()}`;

        console.log('note got');
        content.value = note.length ? note[0].note : '';
      } catch (error) {
        console.log(error);
      }
    };

    const getDots = async () => {
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('inserted_at')
          .eq('user_id', user_id);
        if (error) throw error;
        let array = [];
        data.map((item) => array.push(item.inserted_at));
        dates.value = array;
        console.log('dots get');
      } catch (error) {
        console.log(error.message);
      }
    };
    getNote();
    getDots();
    return {
      date,
      username,
      isLoading,
      isEditable,
      attributes,
      content,
      setNote,
      getNote,
      getDots,
    };
  },
};
</script>
