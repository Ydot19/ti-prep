<template>
  <div v-if="editor" id="notes">
    <div class="editor-menu">
      <div class="left-side">
        <v-btn title="cmd+shift+b" size="x-small" @click="editor.chain().focus().toggleBold().run()" :disabled="!editorState.editable">
          <b><fa-icon :icon="'bold'" /></b>
        </v-btn>
        <v-btn title="cmd+shift+i" size="x-small" @click="editor.chain().focus().toggleItalic().run()" :disabled="!editorState.editable">
          <fa-icon :icon="'italic'" />
        </v-btn>
        <v-btn title="cmd+shit+7" size="x-small" @click="editor.chain().focus().toggleBulletList().run()" :disabled="!editorState.editable">
          <fa-icon :icon="'list-ol'" />
        </v-btn>
        <v-btn title="cmd+shit+8" size="x-small" @click="editor.chain().focus().toggleBulletList().run()" :disabled="!editorState.editable">
          <fa-icon :icon="'list'" />
        </v-btn>
        <v-btn size="x-small" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :disabled="!editorState.editable">
          <fa-icon :icon="'heading'" />
        </v-btn>
        <v-btn size="x-small" @click="editor.commands.undo()" :disabled="!editorState.editable">
          <fa-icon :icon="'rotate-left'" />
        </v-btn>
        <v-btn size="x-small" @click="editor.commands.toggleBlockquote()" :class="{ 'is-active': editor.isActive('blockquote') }" :disabled="!editorState.editable">
          <fa-icon :icon="'quote-left'" />
        </v-btn>
        <v-btn size="x-small" @click="setLink" :disabled="!editorState.editable">
          <fa-icon :icon="'link'" />
        </v-btn>
        <v-btn size="x-small" :disabled="!editorState.editable">
          <p class="text-x-small">Save</p>
          <fa-icon :icon="'fa-cloud-arrow-up'" />
        </v-btn>
      </div>
      <div class="flex-auto-width">
        <slot></slot>
      </div>
      <div class="toggle">
        <p>Mode</p>
        <read-update-toggle @isEditable="updateEditableVal" />
      </div>
    </div>
    <div>
      <editor-content :editor="editor" />
    </div>
    <div class="code-block-button" :class="{hidden: !codeEnabled}">
      <div class="language-selector" :class="[!codeBlockState.enabled ? 'hidden' : '']">
        <v-select
          :density="'compact'"
          label="Select Language"
          :items=languages
          variant="solo-filled"
          v-model="codeBlockState.language"
          :disabled="!editorState.editable"
        >
        </v-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EditorContent, useEditor, VueNodeViewRenderer } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { reactive, watch } from 'vue';
import { lowlight } from 'lowlight/lib/core';
import golang from 'highlight.js/lib/languages/go';
import kotlin from 'highlight.js/lib/languages/kotlin';
import rust from 'highlight.js/lib/languages/rust';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import ReadUpdateToggle from './ToggleReadEdit.vue';
import CodeBlock from './CodeBlock.vue';
import { Link } from '@tiptap/extension-link';
import { TabKey } from '@/components/editor/extensions/TabKey';
import { ListItemNoTabNav } from '@/components/editor/extensions/ListItem';
import { Typography } from '@tiptap/extension-typography';

lowlight.registerLanguage('golang', golang);
lowlight.registerLanguage('kotlin', kotlin);
lowlight.registerLanguage('rust', rust);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('typescript', typescript);

lowlight.registerAlias({
  golang: ['go'],
  python: ['py'],
  kotlin: ['kt'],
  rust: ['rs'],
  typescript: ['ts'],
});
export default {
  name: 'text-editor',
  components: {
    ReadUpdateToggle,
    EditorContent,
  },
  emits: ['editingEnabled'],
  props: {
    codeEnabled: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: `<p>
           I’m running Tiptap with Vue.js. 🎉
      </p>
      `,
    },
  },
  setup(props: { codeEnabled: boolean; content: string}, { emit }) {
    const editorState = reactive({
      editable: false,
    });

    const codeBlockState = reactive({
      enabled: props.codeEnabled,
      language: 'python',
    });
    const editor = useEditor({
      content: props.content,
      extensions: [
        StarterKit.configure({
          codeBlock: false,
          listItem: false,
        }),
        CodeBlockLowlight
          .extend({
            addNodeView() {
              return VueNodeViewRenderer(CodeBlock);
            },
          })
          .configure({
            lowlight,
          }),
        Link.configure({
          openOnClick: true,
          HTMLAttributes: {
            class: 'linked',
          },
          validate: (href) => /^https?:\/\//.test(href),
        }),
        ListItemNoTabNav,
        TabKey,
        Typography,
      ],
      editable: editorState.editable,
    });

    /*
    METHODS
     */
    function updateEditableVal(val: boolean) {
      editorState.editable = val;
      emit('editingEnabled', editorState.editable);
    }

    function enableCodeBlock() {
      editor.value?.commands.toggleCodeBlock();
      const a = editor.value?.isActive('codeBlock');
      const b = editor.value?.isEditable;
      codeBlockState.enabled = !!(a !== undefined && b !== undefined && a && b);
    }

    function setLink() {
      const previousUrl = editor.value?.getAttributes('link').href;
      const url = window.prompt('Paste URL', previousUrl);

      if (url === null) {
        return;
      }

      if (url === '') {
        editor.value?.chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run();

        return;
      }

      // update link
      editor.value?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }

    /*
    WATCHERS
     */
    watch(editorState, () => {
      editor.value?.setEditable(editorState.editable);
    });

    return {
      editor,
      editorState,
      codeBlockState,
      setLink,
      updateEditableVal,
      languages: lowlight.listLanguages(),
    };
  },

};
</script>

<style>

div#notes{
  text-align: left;
}

div.editor-menu, div.code-block-button {
  margin-top: 0.3em;
  display: flex;
  justify-content: center;
}

div.editor-menu div.left-side {
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 8px;
}

div.editor-menu div.left-side div {
  position: absolute;
  bottom: 0px;
}

div.flex-auto-width {
  width: 100%;
  text-align: center;
  margin-top: 0.3em;
  font-weight: bold;
  font-style: italic;
}

div.bottom {
  bottom: 0;
}

div.language-selector {
  width: 185px;
  display: flex;
}

div.hidden {
  display: none;
}

div.ProseMirror {
  text-indent: 1em;
  border-style: solid;
  margin-top: 0.20em;
  border-color: #2c3e50;
  border-radius: 0.3em;
}

div.ProseMirror ul, ol {
  margin-left: 1.4em;
}

div.toggle {
  right: 20px;
  margin-top: 0.3em;
  display: inline-flex;
  align-self: end;
  margin-left: auto;
  align-items: center;
}

div.toggle p {
  margin-right: 0.15em;
}

blockquote {
  background: #f9f9f9;
  border-left: 5px solid #ccc;
  margin: 0.5em 1em;
  padding: 0.5em 0.5em;
}

p.text-x-small {
  font-size: 9px;
  margin-right: 1px;
}

</style>
