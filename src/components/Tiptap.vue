<template>
  <div>
    <div v-if="editor">
      <div class="flex space-x-4 text-gray-400">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <font-awesome-icon icon="bold" />
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <font-awesome-icon icon="italic" />
        </button>
        <button
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          <font-awesome-icon icon="underline" />
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <font-awesome-icon icon="list" />
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <font-awesome-icon icon="list-ol" />
        </button>
      </div>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { ref } from 'vue';

export default {
  components: {
    EditorContent,
  },

  setup() {
    const content = ref('<p>Write something about your day.</p>');
    const editor = useEditor({
      content: content.value,
      extensions: [
        StarterKit.configure({
          history: false,
          heading: {
            levels: [1, 2],
          },
        }),
        Underline,
        BulletList,
        OrderedList,
        ListItem,
      ],
    });

    return { editor };
  },
};
</script>

<style>
.is-active {
  color: #000;
}
</style>
