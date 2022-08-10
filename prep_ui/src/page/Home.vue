<template>
  <div class="home">
    <AppTitle></AppTitle>
    <div class="home-selection">
      <template  v-for="category in HomeSelectionItems" :key="category">
              <CategoryCard :title=category.name :url=category.url>
                <div class="content" v-html="category.slot"></div>
              </CategoryCard>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import CategoryCard from '@/components/CategoryCard.vue';
import AppTitle from '@/components/AppTitle.vue';

export default {
  components: {
    AppTitle,
    CategoryCard,
  },
  name: 'HomePage',
  data() {
    interface Selection {
      name: string
      url: string
      slot: any
    }

    const HomeSelectionItems: Array<Selection> = [
      {
        name: 'Problems By Classification',
        url: '/problems',
        slot: `
      <p>Search Problems By LeetCode Classification such as the following...</p>
      <ul>
        <li> Array </li>
        <li> Dynamic Programming etc. </li>
      </ul>

      `,
      },
      {
        name: 'Problems By Company',
        url: '/company',
        slot: '<p>Problems By LeetCode Classifications Associated To A Specific Companies</p>',
      }];
    return {
      HomeSelectionItems,
    };
  },

};

</script>

<style scoped>
  div.home-selection {
    display: grid;
    /*grid-template-columns: "select_a select_b";*/
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 3rem;
  }
</style>
