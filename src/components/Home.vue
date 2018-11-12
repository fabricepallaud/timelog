<template>
  <div>
    <nav>
      <v-btn @click="viewPreviousWeek" dark>
        <v-icon dark>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn @click="viewCurrentWeek" dark>
        THIS WEEK
      </v-btn>
      <v-btn @click="viewNextWeek" dark>
        <v-icon dark>keyboard_arrow_right</v-icon>
      </v-btn>
    </nav>
    <project-row :project="1"></project-row>
    <br>
    <new-row-form></new-row-form>
  </div>
</template>

<script>
import moment from 'moment';
import NewRowForm from './NewRowForm.vue';
import ProjectRow from './ProjectRow.vue';

export default {
  name: 'home',
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
    addProject() {
      db.collection('project').add({
        Name: 'Default project name',
        Description: 'Default project decription'
      })
      .then(function(docRef) {
        //console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        //console.error("Error adding document: ", error);
      });
    }
  }
}
</script>

<style>
  
</style>