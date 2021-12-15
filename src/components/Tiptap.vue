<template>
  <div>
    <div v-if="editor">
      <div class="flex space-x-4 text-gray-400 mb-2 bg-gray-100 rounded-md p-2">
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          <font-awesome-icon icon="paragraph" />
        </button>
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
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
// import { ref } from 'vue';

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Underline],
      content: `<p>Write something about your day</p>`,
    });
  },
  beforeUnmount() {
    this.editor.distroy();
  },
};
</script>

<style lang="css" scoped>
.ProseMirror > * + * {
  margin-top: 0.75em;
}

.is-active {
  color: #000;
}
</style>
