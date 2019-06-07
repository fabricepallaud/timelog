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
                  <span :key="project.projectId"></span>
                  <v-divider :key="project.projectId"></v-divider>
                  <v-list-tile :key="project.projectId">

                    <v-list-tile-content>
                      <router-link
                        :to="{
                          name: 'Project',
                          params: {
                            projectId: project.projectId,
                            clientId: project.clientId,
                            clientName: project.clientName
                          }
                        }"
                        class="project-link">
                          <v-list-tile-title v-html="project.projectName"></v-list-tile-title>
                        </router-link>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-icon
                        @click="deleteProject(project.projectId, index)"
                        title="Delete Project"
                      >delete</v-icon>
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
                      v-model="newProjectClient"
                      item-text="name"
                      item-value="id"
                      label="Select a Client"
                      solo
                      return-object
                    ></v-select>

                    <v-text-field
                      v-else
                      v-model="newProjectClientName"
                      label="Client Name"
                      ref="clientname"
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
import { db } from '~/plugins/firebase'

export default {
  data() {
    return {
      existingProjects: [],
      existingClients: [],
      newProjectClient: '',
      newProjectClientName: '',
      newProjectClientId: '',
      newProjectName: '',
      clientSelect: true,
      toggleClientButtonCaption: 'New Client'
    }
  },
  watch: {
    newProjectClient: function (obj) {
      this.newProjectClientId = obj.id
      this.newProjectClientName = obj.name
    }
  },
  mounted() {
    // Populate existingProjects array (for the 'Projects' section on the page)
    // with all projects recorded in Firebase for this user
    db.collection('projects').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const projectId = doc.id
          const projectName = doc.data().projectName
          const clientId = doc.data().clientId

          // Get client name for this project
          const client = db.collection('clients').doc(clientId)
          client.get().then((doc) => {
            if (doc.exists) {
              const data = {
                'projectId': projectId,
                'projectName': projectName,
                'clientName': doc.data().clientName,
                'clientId': doc.id
              }
              this.existingProjects.push(data)
            }
          })
            .catch(function (error) {
              console.log('Error getting document:', error)
            })
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })

    // Populate existingClients array (for the client list in the 'New Project' section on the page)
    // with ALL clients - not just clients attached to active projects
    db.collection('clients').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'name': doc.data().clientName
          }
          this.existingClients.push(data)
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
  },
  methods: {
    createProject: function () {
      // Custom form validation imposed by conditional usage of different fields
      if ((this.clientSelect && !this.newProjectClientId) ||
        (!this.clientSelect && !this.newProjectClientName) ||
        (!this.newProjectName)) return

      // If a client was merely selected from the select element
      if (this.clientSelect) {
        db.collection('projects').add({
          projectName: this.newProjectName,
          clientId: this.newProjectClientId
        })
          .then((docRef) => {
            const data = {
              'projectId': docRef.id,
              'projectName': this.newProjectName,
              'clientId': this.newProjectClientId,
              'clientName': this.newProjectClientName
            }
            this.existingProjects.push(data)

            // Reset form
            this.clientSelect = true
            this.toggleClientButtonCaption = 'New Client'
            this.newProjectName = ''
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
      } else {
        // If a new client was entered in the text input

        // Add new client in database
        db.collection('clients').add({
          clientName: this.newProjectClientName
        })
          .then((docRef) => {
            // Update clients select
            const data = {
              'id': docRef.id,
              'name': this.newProjectClientName
            }
            this.existingClients.push(data)

            // Add new project in database
            db.collection('projects').add({
              projectName: this.newProjectName,
              clientId: docRef.id
            })
              .then((docRef) => {
                const data = {
                  'projectId': docRef.id,
                  'projectName': this.newProjectName
                }
                this.existingProjects.push(data)

                // Reset form
                this.clientSelect = true
                this.toggleClientButtonCaption = 'New Client'
                this.newProjectName = ''
              })
              .catch(function (error) {
                console.error('Error adding document: ', error)
              })
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
      }
    },
    toggleClient: function () {
      this.clientSelect = !this.clientSelect
      if (this.clientSelect) {
        this.toggleClientButtonCaption = 'New Client'
      } else {
        this.newProjectClientName = ''
        this.toggleClientButtonCaption = 'Choose a Client'
        // this.$refs.clientname.focus()
      }
    },
    deleteProject: function (projectId, index) {
      db.collection('projects').doc(projectId).delete()
        .then(() => {
          const removeIndex = this.existingProjects.map(function (item) { return item.projectId }).indexOf(projectId)
          this.existingProjects.splice(removeIndex, 1)
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    }
  }
}
</script>

<style lang="scss">
// @import '../styles/main.scss';

form {
  padding: 16px;
}

.select-project .v-input__slot {
  margin-bottom: 15px;
}

.select-project .v-text-field .v-input__control {
  min-height: 36px;
}

.select-project .new-project-client .v-btn {
  margin-top: 0;
}

.select-project .v-input.v-text-field {
  padding-top: 0;
  margin-top: 0;
}

.select-project .new-project-client button {
  margin-left: 8px;
}

.project-link {
  text-decoration: none;
  color: inherit;
}
</style>
