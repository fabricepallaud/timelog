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
             <h4>Project</h4>
            <v-select
              :items="projects"
              label="Select a Project"
              solo
            ></v-select>
          </div>
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
  export default {
    data() {
      return {
        dialog: false,
        projects: ['Project #1', 'Project #2', 'Project #3']
      }
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