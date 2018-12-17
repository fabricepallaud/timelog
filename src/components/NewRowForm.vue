<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <v-btn slot="activator">
        New Row<v-icon right>add_box</v-icon>
      </v-btn>

      <v-card>

        <v-card-title class="headline grey lighten-2" primary-title>
          New Row
        </v-card-title>

        <v-card-text>
          <div>
            <h4>Project / Task</h4>
            <v-select
              :items="projects"
              v-model="project"
              item-text="projectName"
              item-value="projectId"
              solo
              return-object
            ></v-select>

            <v-select
              :items="tasks"
              v-model="task"
              solo
            ></v-select>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="newRow">
            Save Row
          </v-btn>
          <v-btn @click.native="dialog = false">
            Close
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ProjectRow from './ProjectRow.vue';
import { db } from '../firebase';
import store from '../store';

export default {
  data() {
    return {
      dialog: false,
      projects: [],
      project: '',
      tasks: ['Development', 'Design', 'Project management', 'Marketing'],
      task: ''
    }
  },
  mounted() {

    // Populate 'projects' array with projects recorded in Firebase
    db.collection('projects').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = {
          'projectId': doc.id,
          'projectName': doc.data().name,
          'clientId': doc.data().clientId
        }
        this.projects.push(data);
      });

      // Initialize all selects on page load with first value of each array
      this.project = this.projects[0];
      this.task = this.tasks[0];
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  },
  methods: {
    newRow: function() {
      this.dialog = false;
      this.$emit(
        'newRow', 
        this.project.projectId,
        this.task, 
        this.$store.state.userId);
    }
  }
}
</script>

<style scoped>
body {
  border: 10px solid red;
}

#new-row-form {
  display: none;
}

.active {
  display: block !important;
}
</style>