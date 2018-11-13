<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <v-btn slot="activator" color="lighten-2" dark @click="newRow">
        New Row
      </v-btn>

      <v-card>

        <v-card-title class="headline grey lighten-2" primary-title>
          New Row
        </v-card-title>

        <v-card-text>
          <div>
            <!--
            <h4>Project</h4>
            <select>
              <option name="projet1" value="Project #1">Project #1</option>
              <option name="projet2" value="Project #2">Project #2</option>
            </select>
            -->
             <h4>Project</h4>
            <v-select
              :items="projects"
              label="Select a Project"
              solo
            ></v-select>
          </div>
          <!--
          <div>
            <h4>Task</h4>
            <select>
              <option name="task1" value="Task #1">Task #1</option>
              <option name="task2" value="Task #2">Task #2</option>
            </select>
          </div>
          -->
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="dialog = false">
            Save Row
          </v-btn>
          <v-btn @click.native="dialog = false">
            Close
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
    <div ref="container"></div>
  </div>
</template>

<script>
  /*
  import ProjectRow from './ProjectRow.vue';
  import Vue from 'vue';
  let ProjectRowClass = Vue.extend(ProjectRow);
  let ProjectRowInstance = new ProjectRowClass();
  ProjectRowInstance.$mount();
  this.$refs.container.appendChild(ProjectRowInstance.$el);
  */
  export default {
    data() {
      return {
        dialog: false,
        projects: ['Project #1', 'Project #2', 'Project #3']
      }
    },
    created() {
      //const bod = document.querySelector('.container');
      const newTodo = document.createElement('div');
      newTodo.setAttribute('ref', 'container');
      newTodo.textContent = 'Do homework';
      //bod.appendChild(newTodo);
      //document.getElementById('app').appendChild(newTodo);
      const bod = document.querySelector('body');
      bod.appendChild(newTodo);

      /*
      var node = document.createElement("LI");                 // Create a <li> node
      var textnode = document.createTextNode("Water");         // Create a text node
      node.appendChild(textnode);                              // Append the text to <li>
      document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"
      */

    },
    methods: {
      newRow: function() {
        this.$store.dispatch('addProject');
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