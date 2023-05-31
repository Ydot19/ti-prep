<template>
  <div>
    <p class="is-size-2">Classification</p>
    <h1><b><i>{{classification}}</i></b></h1>
  </div>
  <div class="buttons is-centered">
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <v-btn
          :class="{ selected: easyDifficultyEnabled }"
          @click="enabledDisableEasyDifficultyProblems(!easyDifficultyEnabled)"
          class="button is-small">
          Easy
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          :class="{ selected: mediumDifficultyEnabled }"
          @click="enabledDisableMediumDifficultyProblems(!mediumDifficultyEnabled)"
          class="button is-small"
        >
          Medium
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          :class=" { selected: hardDifficultyEnabled }"
          @click="enabledDisableHardDifficultyProblems(!hardDifficultyEnabled)"
          class="button is-small">
          Hard
        </v-btn>
      </v-col>
    </v-row>
  </div>
  <div v-if="getProblemsResponse != null">
    <div class="fitted-table table-left-align">
      <v-table id="scrollable-table">
        <thead>
          <tr>
            <th class="text-left">
              Problem Name
            </th>
            <th class="text-left">
              Difficulty
            </th>
            <th class="text-left">
              Mastery
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="problem in getProblemsResponse.data.problems"
            :key="problem.id"
            :class="{ showProblem: getEnableOrDisableVarFromEnum(problem.difficulty) }"
            v-on:click="goToUrl(createUrl(problem))"
          >
            <td class="text-left">{{ problem.title }}</td>
            <td class="text-left">{{ problem.difficulty }}</td>
            <td class="mastery-icon">
              <div v-if="problem.mastered">
                <fa-icon :icon="['fas', 'circle-check']"/>
              </div>
              <div v-else>
                <fa-icon :icon="['fas', 'circle-xmark']"/>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script lang="ts">

import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import IProblemRecord from '@/interface/IProblemRecord';
import Difficulty from '@/models/enums';
import router from '@/router';

export default {
  name: 'ProblemsByClassification',
  setup() {
    const route = useRoute();
    const store = useStore();
    const { classification } = route.params;
    const easyDifficultyEnabled = ref(true);
    const mediumDifficultyEnabled = ref(true);
    const hardDifficultyEnabled = ref(true);
    const getProblemsResponse = computed(() => store.getters.getProblemsResponse);
    onMounted(() => {
      store.dispatch('fetchProblemsByClassifications', classification);
    });

    function getEnableOrDisableVarFromEnum(diff: Difficulty): boolean {
      switch (diff) {
        case Difficulty.Easy:
          return easyDifficultyEnabled.value;
        case Difficulty.Medium:
          return mediumDifficultyEnabled.value;
        case Difficulty.Hard:
          return hardDifficultyEnabled.value;
        default:
          return false;
      }
    }

    function enableAllIfNoneSelected() {
      // eslint-disable-next-line vue/max-len
      if (Number(easyDifficultyEnabled.value) + Number(mediumDifficultyEnabled.value) + Number(hardDifficultyEnabled.value) === 0) {
        easyDifficultyEnabled.value = true;
        mediumDifficultyEnabled.value = true;
        hardDifficultyEnabled.value = true;
      }
    }
    function enabledDisableEasyDifficultyProblems(val: boolean) {
      easyDifficultyEnabled.value = val;
      enableAllIfNoneSelected();
    }

    function enabledDisableMediumDifficultyProblems(val: boolean) {
      mediumDifficultyEnabled.value = val;
      enableAllIfNoneSelected();
    }

    function enabledDisableHardDifficultyProblems(val: boolean) {
      hardDifficultyEnabled.value = val;
      enableAllIfNoneSelected();
    }

    function createUrl(record: IProblemRecord) {
      return `/problems/detail/${record.id}`;
    }

    return {
      classification,
      easyDifficultyEnabled,
      enabledDisableEasyDifficultyProblems,
      mediumDifficultyEnabled,
      enabledDisableMediumDifficultyProblems,
      hardDifficultyEnabled,
      enabledDisableHardDifficultyProblems,
      createUrl,
      getProblemsResponse,
      getEnableOrDisableVarFromEnum,
    };
  },
  methods: {
    goToUrl: (url: string) => {
      router.push({ path: url });
    },
  },
};
</script>

<style scoped>
  div.buttons {
    margin-top: 10px;
  }

  div.fitted-table {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }

  #scrollable-table {
    max-height: 75vh;
    overflow-y: scroll;
    width: 70vw;
    margin-left: 3%;
    margin-right: 3%;
  }

  #scrollable-table table {
    align-content: center;
  }

  #scrollable-table table th {
    position: sticky;
    top: 0;
  }

  #scrollable-table table tr.text-left {
    text-align: left;
  }
  #scrollable-table table th:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  #scrollable-table table th:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  #scrollable-table table th {
    background: teal;
    border-bottom-color: #42b983;
    color: azure;
    border-bottom-width: 5px;
  }
  #scrollable-table tbody tr:hover {
    transform: scale(1.025);
    background-color: #42b983;
    color: azure;
  }
  .selected {
    background-color: #42b983;
    color: azure;
  }
  #scrollable-table tbody tr:not(.showProblem) {
    display: None;
  }

</style>
