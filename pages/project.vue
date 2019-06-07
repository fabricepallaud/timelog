<template>
  <div>

    <v-container grid-list-md>
      <v-layout row wrap>

        <v-flex xs12>
          <!--<h2>{{ this.$route.params.clientName }}</h2>-->
          <v-text-field
            v-model="task"
            label="Task name"
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-btn
            @click="createTask"
            class="submit"
          >Create task
          </v-btn>
        </v-flex>

        <v-list two-line>
          <template v-for="task in tasks">
            <v-divider :key="task.taskName"></v-divider>
            <v-list-tile-title
              v-html="task.taskName"
              :key="task.taskName">
            </v-list-tile-title>
          </template>
        </v-list>

      </v-layout>
    </v-container>

  </div>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  data() {
    return {
      task: '',
      tasks: []
    }
  },
  mounted() {
    db.collection('tasks').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            this.tasks.push(doc.data().taskName)
          }
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
  },
  methods: {
    createTask: function () {
      const tasksRef = db.collection('tasks')
      tasksRef.add({
        taskName: this.task
      })
        .then((docRef) => {
          // console.log("Document written with ID: ", docRef.id);
          this.tasks.push(this.task)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>

<!-- <style lang="scss">
@import '../styles/main.scss';
</style> -->
