<template>
  <div>
    <div v-if="editor">
      <div
        class="flex space-x-4 justify-center items-center text-gray-400 mb-2 bg-gray-200 rounded-md p-2"
      >
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
        <button v-if="!isLoading" @click="saveContent()">
          <font-awesome-icon icon="save" />
        </button>
        <button v-else disabled class="text-fuchsia-900 animate-spin">
          <font-awesome-icon icon="spinner" />
        </button>
      </div>
    </div>
    <editor-content :editor="editor" class="text-greyish font-Maven text-sm" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      defaut: '',
    },
    isLoading: {
      type: Boolean,
      defaut: false,
    },
    isEditable: {
      type: Boolean,
      defaut: true,
    },
  },

  data() {
    return {
      editor: null,
    };
  },
  methods: {
    saveContent() {
      this.$emit('save-content');
    },
  },
  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value;
      if (isSame) return;

      this.editor.commands.setContent(value, false);
    },
  },
  updated() {
    this.editor.setOptions({ editable: this.isEditable });
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Underline,
        Placeholder.configure({
          placeholder: 'Write something about your day...',
        }),
      ],
      autofocus: true,
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML());
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="css">
.ProseMirror > * + * {
  margin-top: 0.75em;
}

.ProseMirror {
  min-height: 230px;
  padding: 8px;
  width: 100%;
}

.ProseMirror-focused {
  outline: none;
}

.ProseMirror h1 {
  font-size: 1.5rem;
  line-height: 2rem;
}

.ProseMirror h2 {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.ProseMirror p {
  font-size: 1rem;
  line-height: 1.5rem;
}

.ProseMirror ul li {
  list-style-type: disc;
}

.ProseMirror ol li {
  list-style-type: decimal;
}

.ProseMirror li {
  margin-left: 12px;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.is-active {
  color: #000;
}
</style>
