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
              item-text="taskName"
              item-value="taskId"
              solo
              return-object
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
// import ProjectRow from '@/components/ProjectRow.vue';
import { db } from '~/plugins/firebase'
// import store from '../store';

export default {
  data() {
    return {
      dialog: false,
      projects: [],
      project: '',
      tasks: [],
      task: ''
    }
  },
  mounted() {
    // Populate 'projects' array with projects recorded in Firebase
    db.collection('projects').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            'projectId': doc.id,
            'projectName': doc.data().projectName,
            'clientId': doc.data().clientId
          }
          this.projects.push(data)
        })

        // Initialize project select on page load with first value of each array
        this.project = this.projects[0]
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })

    // Populate 'tasks' array with tasks recorded in Firebase
    db.collection('tasks').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            'taskId': doc.id,
            'taskName': doc.data().taskName
          }
          this.tasks.push(data)
        })

        // Initialize project select on page load with first value of each array
        this.task = this.tasks[0]
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      });
  },
  methods: {
    newRow: function () {
      this.dialog = false;
      this.$emit(
        'newRow',
        this.project.projectId,
        this.task.taskId,
        this.$store.state.userId)
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
