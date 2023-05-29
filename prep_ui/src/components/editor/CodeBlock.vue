<template>
  <node-view-wrapper class="code-block">
    <div class="code-block-node">
      <pre><code><node-view-content /></code></pre>
    </div>
  </node-view-wrapper>
</template>

<script lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';

export default {
  components: {
    NodeViewContent,
    NodeViewWrapper,
  },
  props: {
    nodeViewProps,
  },
};
</script>

<style>

div.code-block-node pre {
  margin-top: 1em;
  margin-left: 2%;
  margin-right: 2%;
  padding: 0.5em 0.5em 0.5em 0.5em;
  border-radius: 0.25em;
  background: #333;
  color: #81bce9;
  box-shadow: 5px 5px cornsilk;

}

div.code-block-node pre code div {
  text-indent: 0.3em;
}

.hljs {
  background: #333;
  color: #fff;
}

.language-xml .hljs-meta,
.language-xml .hljs-meta-string {
  font-weight: bold;
  font-style: italic;
  color: #69f;
}

.hljs-comment,
.hljs-quote {
  font-style: italic;
  color: #9c6;
}

.hljs-name,
.hljs-keyword,
.hljs-built_in {
  color: #a7a;
}

.hljs-name,
.hljs-attr {
  font-weight: bold;
}

.hljs-string {
  font-weight: normal;
}

.hljs-code,
.hljs-string,
.hljs-meta .hljs-string,
.hljs-number,
.hljs-regexp,
.hljs-link {
  color: #bce;
}

.hljs-title,
.hljs-symbol,
.hljs-bullet,
.hljs-variable,
.hljs-template-variable {
  color: #d40;
}

.hljs-title.class_,
.hljs-class .hljs-title,
.hljs-type {
  font-weight: bold;
  color: #96c;
}

.hljs-title.function_,
.hljs-function .hljs-title,
.hljs-attr,
.hljs-subst,
.hljs-tag {
  color: #fff;
}

.hljs-formula {
  background-color: #eee;
  font-style: italic;
}

.hljs-addition {
  background-color: #797;
}

.hljs-deletion {
  background-color: #c99;
}

.hljs-meta {
  color: #69f;
}

.hljs-section,
.hljs-selector-id,
.hljs-selector-class,
.hljs-selector-pseudo,
.hljs-selector-tag {
  font-weight: bold;
  color: #69f;
}

.hljs-selector-pseudo {
  font-style: italic;
}

.hljs-doctag,
.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}
</style>
