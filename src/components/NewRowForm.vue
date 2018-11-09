<template>
  <!--
  <div id="new-row-form" :class="{ active: active }">
    <h3>New Row</h3>
    <div>
      <h4>Project</h4>
      <select>
        <option name="projet1" value="Project #1">Project #1</option>
        <option name="projet2" value="Project #2">Project #2</option>
      </select>
    </div>
    <div>
      <h4>Task</h4>
      <select>
        <option name="task1" value="Task #1">Task #1</option>
        <option name="task2" value="Task #2">Task #2</option>
      </select>
    </div>
    <button @click="close">Close</button>
  </div-->
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        color="red lighten-2"
        dark
      >
        Click Me
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          New Row
        </v-card-title>

        <v-card-text>
          <div>
            <h4>Project</h4>
            <select>
              <option name="projet1" value="Project #1">Project #1</option>
              <option name="projet2" value="Project #2">Project #2</option>
            </select>
          </div>
          <div>
            <h4>Task</h4>
            <select>
              <option name="task1" value="Task #1">Task #1</option>
              <option name="task2" value="Task #2">Task #2</option>
            </select>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Save Row
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import ProjectRow from './ProjectRow.vue';
  import Vue from 'vue';
  let ProjectRowClass = Vue.extend(ProjectRow);
  let ProjectRowInstance = new ProjectRowClass();
  ProjectRowInstance.$mount();
  this.$refs.container.appendChild(ProjectRowInstance.$el);

  export default {
    data() {
      return {
        dialog: false
      }
    },
    /*
    computed: {
      active() {
        return this.$store.state.newRowFormActive;
      }
    },
    methods: {
      close: function() {
        this.$store.commit('newRowFormActive', false);
      }
    }
    */
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