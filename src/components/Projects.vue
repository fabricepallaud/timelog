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
                <template v-for="(project, index) in existingProjects">
                  <v-divider></v-divider>
                  <v-list-tile>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="project.name"></v-list-tile-title>
                      <!--
                      <v-list-tile-sub-title v-html="project.Description"></v-list-tile-sub-title>
                      -->
                      <!--
                      Display client info here
                      -->
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-icon @click="deleteProject(project.projectId, index)">delete</v-icon>
                    </v-list-tile-action>

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

              <v-form class="select-project">

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-text-field
                      v-model="newProjectName"
                      label="Project Name"
                    ></v-text-field>
  
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="new-project-client">

                  <v-flex xs6>
     
                    <v-select
                      v-if="clientSelect"
                      :items="existingClients"
                      v-model="newProjectClientId"
                      item-text="name"
                      item-value="id"
                      label="Select a Client"
                      solo
                    ></v-select>

                    <v-text-field
                      v-else
                      v-model="newProjectClientName"
                      label="Client Name"                      
                    ></v-text-field>
       
                  </v-flex>

                  <v-flex xs6>

                    or 
                    <v-btn
                      @click="toggleClient"
                    >{{ toggleClientButtonCaption }}
                    </v-btn>

                  </v-flex>

                </v-layout>

                <v-btn
                  @click="createProject"
                  class="submit"
                >Save Project
                </v-btn>

              </v-form>

            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

  </div>
</template>

<script>
import { db } from '../firebase';

export default {
  data() {
    return {
      existingProjects: [],
      existingClients: [],
      newProjectClientName: '',
      newProjectClientId: '',
      newProjectName: '',
      clientSelect: true,
      toggleClientButtonCaption: 'New Client'
    }
  },
  mounted() {
    /* Populate 'projects' array with projects recorded in Firebase */
    db.collection('projects').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = {
          'projectId': doc.id,
          'name': doc.data().name
        }
        this.existingProjects.push(data);
      });
      //console.log(this.existingProjects);
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });

    /* Populate 'clients' array with clients recorded in Firebase */
    db.collection('clients').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = {
          'clientId': doc.id,
          'name': doc.data().name
        }
        this.existingClients.push(data);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  },
  methods: {
    createProject: function() {
      // Custom form validation imposed by conditional usage of different fields 
      if ((this.clientSelect && !this.newProjectClientId)
        || (!this.clientSelect && !this.newProjectClientName)
        || (!this.newProjectName)) return;

      // If a client was merely selected from the select element
      if (this.clientSelect) {
        db.collection('projects').add({
          name: this.newProjectName,
          clientId: this.newProjectClientId,
        })
        .then((docRef) => {
          let data = {
            'projectId': docRef.id,
            'name': this.newProjectName
          }
          this.existingProjects.push(data);
          // Reset form
          this.clientSelect = true;
          this.toggleClientButtonCaption = "New Client";
          this.newProjectName = '';
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      }

      // If a new client was entered in the text input
      else {

        // Add new client in database
        db.collection('clients').add({
          name: this.newProjectClientName
        })
        .then((docRef) => {

          // Update clients select
          let data = {
            'clientId': docRef.id,
            'name': this.newProjectClientName
          }
          this.existingClients.push(data);

          // Add new project in database
          db.collection('projects').add({
            name: this.newProjectName,
            clientId: docRef.id
          })
          .then((docRef) => {
            let data = {
              'projectId': docRef.id,
              'name': this.newProjectName
            }            
            this.existingProjects.push(data);
            // Reset form
            this.clientSelect = true;
            this.toggleClientButtonCaption = "New Client";
            this.newProjectName = '';
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
        })
        .catch(function(error) {
          //console.error("Error adding document: ", error);
        });
      }      
    },
    toggleClient: function() {
      this.clientSelect = !this.clientSelect;
      //this.toggleClientButtonCaption = this.clientSelect ? "New Client" : "Choose a Client";
      if (this.clientSelect) {
        //this.newProjectName = '';
        this.toggleClientButtonCaption = "New Client";
      }
      else {
        this.newProjectClientName = '';
        this.toggleClientButtonCaption = "Choose a Client";
      }
    },
    deleteProject: function(projectId, index) {
      db.collection('projects').doc(projectId).delete()
      .then(() => {
        var removeIndex = this.existingProjects.map(function(item) { return item.projectId; }).indexOf(projectId);
        this.existingProjects.splice(removeIndex, 1);
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }
  }
}
</script>

<style scoped>
@import '../styles/main.scss';

form {
  padding: 16px;
}

.select-project >>> .v-input__slot {
  margin-bottom: 15px;
}

.select-project >>> .v-text-field .v-input__control {
  min-height: 36px;
}

.select-project >>> .new-project-client .v-btn {
  margin-top: 0;
}

.select-project >>> .v-input.v-text-field {
  padding-top: 0;
  margin-top: 0;
}

.select-project >>> .new-project-client button {
  margin-left: 8px;
}
</style>