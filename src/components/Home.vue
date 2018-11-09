<template>
  <div>
    <nav>
      <button @click="viewPreviousWeek"><</button>
      <button @click="viewCurrentWeek">This week</button>
      <button @click="viewNextWeek">></button>
    </nav>
    <!--
    <project-row :project="1"></project-row>
    -->
    <br>
    <button @click="newRow">New Row</button>
    <new-row-form></new-row-form>
  </div>
</template>

<script>
import moment from 'moment';
import NewRowForm from './NewRowForm.vue';
import ProjectRow from './ProjectRow.vue';

export default {
  name: 'home',
  /*
  data: function() {
    return {
      newRowFormActive: false
    }
  },
  */
  components: {
    ProjectRow,
    NewRowForm
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
    },
    newRow: function() {
      this.$store.state.newRowFormActive = true;
      this.$store.dispatch('addProject');
    }
  }
}
</script>

<style></style>