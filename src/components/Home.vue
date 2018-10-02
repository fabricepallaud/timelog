<template>
  <div id="app">
    <nav>
      <button @click="viewPreviousWeek"><</button>
      <button @click="viewCurrentWeek">This week</button>
      <button @click="viewNextWeek">></button>
    </nav>
    <project-row :project="1"></project-row>
  </div>
</template>

<script>
import moment from 'moment';
import ProjectRow from './ProjectRow.vue';

export default {
  name: 'home',
  components: {
    ProjectRow
  },
  methods: {
    viewNextWeek: function() {
      this.$store.commit('nextWeek');
    },
    viewPreviousWeek: function() {
      this.$store.commit('previousWeek');
    },
    viewCurrentWeek: function() {
      this.$store.commit('thisWeek');
    }
  }
}
</script>

<style></style>