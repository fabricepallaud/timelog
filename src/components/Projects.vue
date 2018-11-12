<template>
  <div>

    <v-container grid-list-md>
      <v-layout row wrap>

        <v-flex xs6>
          <v-card>
            <v-card-text class="px-0">
              <v-subheader>
                <h2>Projects</h2>
              </v-subheader>
              <v-list two-line>
                <template v-for="(project, index) in projects">
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="project.Name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="project.Description"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>    

        <v-flex xs6>
          <v-card>
            <v-card-text class="px-0">
              <v-subheader>
                <h2>New Project</h2>
              </v-subheader>              
              <v-list class="height_auto">
                <template>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-content>
                      <!--
                      <v-form>
                        <v-text-field
                          v-model="clientName"
                          label="Client Name"
                        ></v-text-field>
                        <v-text-field
                          v-model="projectName"
                          label="Project Name"
                        ></v-text-field>
                      </v-form>
                      -->
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

  </div>
</template>

<script>
  import {db} from '../firebase';

  export default {
    data() {
      return {
        projects: [],
        clientName: '',
        projectName: ''
      }
    },
    created() {
      db.collection('project').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = {
            'Description': doc.data().Description,
            'Name': doc.data().Name
          }
          this.projects.push(data);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    }
  }
</script>

<style scoped>
.height_auto .v-list__tile {
  height: auto;
}
</style>