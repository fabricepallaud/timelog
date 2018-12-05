<template>
  <tr>
    <td class="rowDescription">
      <strong>{{ projectName }}</strong> ({{ clientName }})<br>
      {{ task }}
    </td>
    <td>
      <v-text-field v-model="monTime" class="v-custom-text-field" outline @change="addEntry(mon, monTime)"></v-text-field>
    </td>
    <td>
      <v-text-field v-model="tueTime" class="v-custom-text-field" outline @change="addEntry(tue, tueTime)"></v-text-field>
    </td>
    <td class="today">
      <v-text-field v-model="wedTime" class="v-custom-text-field" outline @change="addEntry(wed, wedTime)"></v-text-field>
    </td>
    <td>
      <v-text-field v-model="thuTime" class="v-custom-text-field" outline @change="addEntry(thu, thuTime)"></v-text-field>
    </td>
    <td>
      <v-text-field v-model="friTime" class="v-custom-text-field" outline @change="addEntry(fri, friTime)"></v-text-field>
    </td>
    <td>
      <v-text-field v-model="satTime" class="v-custom-text-field" outline @change="addEntry(sat, satTime)"></v-text-field>
    </td>
    <td>
      <v-text-field v-model="sunTime" class="v-custom-text-field" outline @change="addEntry(sun, sunTime)"></v-text-field>
    </td>
    <td class="rowTotal">
      {{ rowTotal }}
    </td>
    <td class="row">
      <span class="pa-3">
        <v-icon small>delete</v-icon>
      </span>
    </td>
  </tr>
</template>

<script>
import moment from 'moment';
import Vue from 'vue';
import store from '../store';
import { db } from '../firebase';
import { EventBus } from './event-bus.js';

export default {
  props: [
    'projectId',
    'task',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun'
  ],
  data() {
    return {
      projectName: '',
      clientId: '',
      clientName: '',
      monTime: '',
      tueTime: '',
      wedTime: '',
      thuTime: '',
      friTime: '',
      satTime: '',
      sunTime: '',
      rowTotal: ''
    }
  },
  methods: {
    addEntry: function(day, hours) {

      // Get time for that day, project, task & user
      var timeDay = db.collection('times')
      .where('date', '==', day)
      .where('projectId', '==', this.projectId)
      .where('task', '==', this.task)
      .where('userId', '==', this.$store.state.userId);
      timeDay.get()
      .then((querySnapshot) => {
        if (querySnapshot.size) { 

          // If there's already a time entry for this day, project, task and user, then update it
          querySnapshot.forEach((doc) => {
            doc.ref.set(
            {
              hours: hours
            },
            {
              merge: true
            })
            .then(function() {
              //console.log("Document overriden with ID: ", doc.id);
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
          });

        }
        else {

          // If not entry was found, create a new one
          var timesRef = db.collection('times');
          timesRef.add({
            date: day,
            hours: hours,
            projectId: this.projectId,
            task: this.task,
            userId: this.$store.state.userId
          })
          .then(function(docRef) {
            //console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });

        }
      })
      .catch(function(error) {
      });
    },
    nextWeek: function() {
      alert('next week!');
    }
  },
  mounted() {

    // User clicked "Next Week" button (from Home.vue component)
    EventBus.$on('goNextWeek', monRaw => {
      this.mon = moment(this.mon).add(1, 'weeks');
    });

    // User clicked "Last Week" button (from Home.vue component)
    EventBus.$on('goPreviousWeek', monRaw => {
      this.mon = moment(this.mon).subtract(1, 'weeks');
    });

    // Get client id & project name for this project
    var project = db.collection('projects').doc(this.projectId);
    project.get().then((doc) => {
      if (doc.exists) {
        this.projectName = doc.data().name;
        this.clientId = doc.data().clientId;

        // Get client name for this project
        var client = db.collection('clients').doc(this.clientId);
        client.get().then((doc) => {
          if (doc.exists) {
            this.clientName = doc.data().name;
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });

    // Get times for this user, this project & this task within this week
    let weekTimes = [];
    var timesRef = db.collection('times');
    var timesWeek = timesRef
      .where('date', '>=', this.mon)
      .where('date', '<=', this.sun)
      .where('task', '==', this.task)
      .where('projectId', '==', this.projectId)
      .where('userId', '==', this.$store.state.userId);
    timesWeek.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        weekTimes.push(doc.data());
      });
      
      // Populate row with times + total of times at the end of the row
      var total = 0;
      ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach(day => {
        const temp = weekTimes.find(x => x.date === this[day]);
        if (temp) {
          this[day + 'Time'] = temp.hours;
          total += parseInt(temp.hours);
        }
      });

      // Update total number of hours for that row
      this.rowTotal = total;
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error);
    });
  }
}
</script>

<style></style>