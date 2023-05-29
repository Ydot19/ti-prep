<template>
  <div v-if="editor" id="notes">
    <div class="editor-menu">
      <div class="left-side">
        <v-btn size="x-small" @click="editor.chain().focus().toggleBold().run()" :disabled="!editorState.editable">
          <b><fa-icon :icon="'bold'" /></b>
        </v-btn>
        <v-btn size="x-small" @click="editor.chain().focus().toggleItalic().run()" :disabled="!editorState.editable">
          <fa-icon :icon="'italic'" />
        </v-btn>
        <v-btn size="x-small" @click="editor.chain().focus().toggleBulletList().run()" :disabled="!editorState.editable">
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
        <v-btn size="x-small" @click="editor.commands.increaseIndent()" :class="{ 'is-active': editor.isActive('blockquote') }" :disabled="!editorState.editable">
          <fa-icon :icon="'indent'" />
        </v-btn>
        <v-btn size="x-small" @click="setLink" :disabled="!editorState.editable">
          <fa-icon :icon="'link'" />
        </v-btn>
        <v-btn size="x-small" :disabled="!editorState.editable">
          <p class="text-x-small">Save</p>
          <fa-icon :icon="'fa-cloud-arrow-up'" />
        </v-btn>
      </div>
      <div class="toggle">
        <p>Mode</p>
        <read-update-toggle @isEditable="updateEditableVal" />
      </div>
    </div>
    <editor-content :editor="editor" />
    <div class="code-block-button">
      <v-btn size="x-small" @click="enableCodeBlock" :class="{ 'is-active': editor.isActive('codeBlock') }" :disabled="!editorState.editable">
        <fa-icon :icon="'code'" />
      </v-btn>
      <div class="language-selector" :class="[!codeBlockState.enabled ? 'hidden' : '']">
        <v-select
          :density="'compact'"
          label="Select Language"
          :items=languages
          variant="solo-filled"
          v-model="codeBlockState.language"
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
import plaintext from 'highlight.js/lib/languages/plaintext';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import ReadUpdateToggle from './ToggleReadEdit.vue';
import CodeBlock from './CodeBlock.vue';
import { Link } from '@tiptap/extension-link';
import { Indent } from '@/components/editor/extensions/Indent';
import {
  BlockStyles,
  MarginLeft,
  TextFormats,
  TextIndent
} from '@/components/editor/extensions/TextStyles';

lowlight.registerLanguage('plaintext', plaintext);
lowlight.registerLanguage('golang', golang);
lowlight.registerLanguage('kotlin', kotlin);
lowlight.registerLanguage('rust', rust);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('typescript', typescript);

lowlight.registerAlias({
  golang: ['go'],
  python: ['py'],
  rust: ['rs'],
  typescript: ['ts'],
});

export default {
  name: 'text-editor',
  components: {
    ReadUpdateToggle,
    EditorContent,
  },
  setup() {
    const editorState = reactive({
      editable: false,
    });

    const codeBlockState = reactive({
      enabled: false,
      language: 'python',
    });
    const editor = useEditor({
      content: `<p>
           I’m running Tiptap with Vue.js. 🎉
      </p>
      `,
      extensions: [
        StarterKit.configure({
          codeBlock: false,
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
        ...TextFormats,
        ...BlockStyles.map((v) => v.configure({ types: ['listItem', 'taskItem', 'heading', 'paragraph'] })),
        TextIndent.configure({
          types: ['paragraph'],
        }),
        Indent,
      ],
      editable: editorState.editable,
    });

    /*
    METHODS
     */
    function updateEditableVal(val: boolean) {
      editorState.editable = val;
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

    watch(codeBlockState, () => {
      console.log(codeBlockState.language);
    });

    return {
      editor,
      editorState,
      codeBlockState,
      setLink,
      updateEditableVal,
      enableCodeBlock,
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
