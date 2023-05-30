<template>
  <div v-if="problemDetails != null">
    <h1>
      {{ problemDetails.data.problem.title }}
    </h1>
    <template v-for="classification in problemDetails.data.classifications">
      <div class="d-inline">
        <v-btn @click="goToClassificationUrl(classification)" size="small" class="btn-margin-left-tiny btn-margin-top-tiny">{{ classification }}</v-btn>
      </div>
    </template>
    <div>
      <br>
      <span><v-btn size="small" @click="goToProblemUrl(problemDetails.data.problem.title_slug)">Leetcode Link <fa-icon icon="arrow-right" beat-fade/></v-btn></span>
    </div>
    <v-container fluid>
      <v-row no-gutters justify="center">
        <v-col cols="12" md="4" class="height-min-300px">
          <v-sheet class="height-inherit">
            <text-editor @editing-enabled="updateNotesEditability">
              Notes
            </text-editor>
            <div class="editor-nav-buttons">
              <v-btn size="small" :disabled="state.NotesEditingEnabled"><fa-icon :icon="'fa-chevron-left'" /></v-btn>
              <v-btn size="small" :disabled="state.NotesEditingEnabled"> 0 of 0</v-btn>
              <v-btn size="small" :disabled="state.NotesEditingEnabled"><fa-icon :icon="'fa-chevron-right'" /></v-btn>
            </div>
          </v-sheet>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="7" class="left-margin-1em height-min-300px">
          <v-sheet>
            <v-sheet class="height-inherit">
              <text-editor @editing-enabled="updateCodeEditability" :code-enabled="true">
                Code Implementations
              </text-editor>
              <div class="editor-nav-buttons">
                <v-btn size="small" :disabled="state.CodeEditingEnabled"><fa-icon :icon="'fa-chevron-left'" /></v-btn>
                <v-btn size="small" :disabled="state.CodeEditingEnabled"> 0 of 0</v-btn>
                <v-btn size="small" :disabled="state.CodeEditingEnabled"><fa-icon :icon="'fa-chevron-right'" /></v-btn>
              </div>
            </v-sheet>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed, onMounted, reactive } from 'vue';
import router from '@/router';
import TextEditor from '@/components/editor/TextEditor.vue';

export default {
  name: 'ProblemDetails',
  components: { TextEditor },
  setup() {
    const route = useRoute();
    const store = useStore();
    const { id } = route.params;
    const problemDetails = computed(() => store.getters.getProblemDetailsResponse);
    const state = reactive({
      NotesEditingEnabled: false,
      CodeEditingEnabled: false,
    });

    function updateNotesEditability(target: boolean) {
      state.NotesEditingEnabled = target;
    }

    function updateCodeEditability(target: boolean) {
      state.CodeEditingEnabled = target;
    }
    onMounted(() => {
      store.dispatch('fetchProblemDetails', id);
    });

    return {
      problemDetails,
      state,
      updateNotesEditability,
      updateCodeEditability,
    };
  },
  methods: {
    goToClassificationUrl: (classification: string) => {
      const url = `/problems/classifications/${classification}`;
      router.push({ path: url });
    },
    goToProblemUrl: (titleSlug: string) => {
      const url = `https://leetcode.com/problems/${titleSlug}`;
      window.open(url);
    },
  },
};
</script>

<style>

button.btn-margin-left-tiny {
  margin-left: 0.25em;
}

button.btn-margin-top-tiny {
  margin-top: 0.25em;
}

.height-min-300px {
  min-height: 300px;
}

div.editor-nav-buttons button {
  margin-left: 0.3em;
  margin-top: 0.3em;
}

div.height-min-300px div.ProseMirror {
  min-height: 300px;
}
</style>
