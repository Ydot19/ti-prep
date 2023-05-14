<template>
  <div class="classifications">
    <h1 class="title">Problem Classifications</h1>
    <h2 class="subtitle">All Companies</h2>
    <div v-if="categories != null">
      <div class="classification-cards">
        <template v-for="item in categories.data.classifications" :key="item">
          <CategoryCard :title=item.classification :url=createUrl(item.classification)>
            <div class="category-card-slot">
              <CompletionCircle :completed=0 :total=item.count></CompletionCircle>
              <div>Total: {{item.count}} </div>
            </div>
          </CategoryCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CategoryCard from '@/components/CategoryCard.vue';
import CompletionCircle from '@/components/CompletionCircle.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

export default {
  name: 'ClassificationCategories',
  components: {
    CategoryCard,
    CompletionCircle,
  },
  setup() {
    const store = useStore();
    const categories = computed(() => store.getters.getClassificationResponse);
    onMounted(() => {
      store.dispatch('fetchClassifications');
    });
    return {
      categories,
    };
  },
  methods: {
    createUrl(classification: string): string {
      return `/problems/classifications/${classification}`;
    },
  },
};
</script>

<style scoped>
  div.classification-cards {
    display: grid;
    /*grid-template-columns: "select_a select_b";*/
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 3rem;
  }

  div.category-card-slot {
    justify-content: center;
    text-align: center;
  }
</style>
