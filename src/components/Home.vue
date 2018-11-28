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

    <table class="project-row" ref="container">

      <tr>
        <th></th>
        <th>
          Mon<span>{{ mon }}</span>
        </th>
        <th>
          Tue<span>{{ tue }}</span>
        </th>
        <th>
          Wed<span>{{ wed }}</span>
        </th>
        <th>
          Thu<span>{{ thu }}</span>
        </th>
        <th>
          Fri<span>{{ fri }}</span>
        </th>
        <th>
          Sat<span>{{ sat }}</span>
        </th>
        <th>
          Sun<span>{{ sun }}</span>
        </th>
        <th></th>
        <th></th>
      </tr>

      <!--
      <project-row
        :projectId="'1'"
        :projectName="'project1'"
        :task="'task1'"
        :user="'user1'"
        :mon="mon"
        :tue="tue"
        :wed="wed"
        :thu="thu"
        :fri="fri"
        :sat="sat"
        :sun="sun"
      ></project-row>
      -->

    </table>

    <table class="times-table-footer">

      <tr>
        <td>
          <new-row-form @newRow="newRow"></new-row-form>
        </td>
        <td>
          
        </td>
        <td>

        </td>
        <td>

        </td>
        <td>

        </td>
        <td>

        </td>
        <td>

        </td>
        <td>

        </td>
        <td></td>
        <td></td>
      </tr>

    </table>    

  </div>
</template>

<script>
import moment from 'moment';
import NewRowForm from './NewRowForm.vue';
import ProjectRow from './ProjectRow.vue';
import Vue from 'vue';
import store from '../store';
import { db, fb } from '../firebase';

export default {
  name: 'home',
  components: {
    ProjectRow,
    NewRowForm
  },
  computed: {
    mon: function() {
      return moment(this.$store.state.currentWeek).format('DD MMM');
    },
    tue: function() {
      return moment(this.mon).add(1, 'days').format('DD MMM');
    },
    wed: function() {
      return moment(this.mon).add(2, 'days').format('DD MMM');
    },
    thu: function() {
      return moment(this.mon).add(3, 'days').format('DD MMM');
    },
    fri: function() {
      return moment(this.mon).add(4, 'days').format('DD MMM');
    },
    sat: function() {
      return moment(this.mon).add(5, 'days').format('DD MMM');
    },
    sun: function() {
      return moment(this.mon).add(6, 'days').format('DD MMM');
    }
  },
  mounted() {
    this.$store.commit('setUserId', fb.auth().currentUser.uid);
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
    newRow: function(projectId, projectName, clientId, task, user) {
      //alert(projectId + projectName + task + user);
      let ProjectRowClass = Vue.extend(ProjectRow);
      let ProjectRowInstance = new ProjectRowClass({
        store,
        db,
        moment,
        propsData: {
          projectId: projectId,
          projectName: projectName,
          clientId: clientId,
          task: task,
          //user: this.$store.state.userId,
          mon: this.mon,
          tue: this.tue,
          wed: this.wed,
          thu: this.thu,
          fri: this.fri,
          sat: this.sat,
          sun: this.sun,

        }
      });
      ProjectRowInstance.$mount();
      this.$refs.container.appendChild(ProjectRowInstance.$el);
    },
    /*
    addProject() {
      db.collection('projects').add({
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
    */
  }
}
</script>

<style>
@import '../styles/main.scss';

.project-row td {
  border-top: 1px solid #ddd;
}
</style>