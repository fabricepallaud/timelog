<template>
  <tr :class="loaded" v-if="rowActive">
    <td class="rowDescription">
      <strong>{{ projectName }}</strong> ({{ clientName }})<br>
      {{ taskName }}
    </td>
    <td :class="classObject(mon)">
      <v-text-field
        v-model="monTime"
        type="text"
        class="v-custom-text-field"
        outline
        @change="addEntry(mon, monTime, 'monTime')"
      ></v-text-field>
    </td>
    <td :class="classObject(tue)">
      <v-text-field
        v-model="tueTime"
        type="text"
        class="v-custom-text-field"
        outline
        @change="addEntry(tue, tueTime, 'tueTime')"
      ></v-text-field>
    </td>
    <td :class="classObject(wed)">
      <v-text-field
        v-model="wedTime"
        type="text"
        class="v-custom-text-field"
        outline
        @change="addEntry(wed, wedTime, 'wedTime')"
      ></v-text-field>
    </td>
    <td :class="classObject(thu)">
      <v-text-field
        v-model="thuTime"
        type="text"
        class="v-custom-text-field"
        outline
        @change="addEntry(thu, thuTime, 'thuTime')"
      ></v-text-field>
    </td>
    <td :class="classObject(fri)">
      <v-text-field
        v-model="friTime"
        type="text"
        class="v-custom-text-field"
        outline
        @change="addEntry(fri, friTime, 'friTime')"
      ></v-text-field>
    </td>
    <td :class="classObject(sat)">
      <v-text-field
        v-model="satTime"
        type="text"
        class="v-custom-text-field"
        outline
        @change="addEntry(sat, satTime, 'satTime')"
      ></v-text-field>
    </td>
    <td :class="classObject(sun)">
      <v-text-field
        v-model="sunTime"
        type="text"
        class="v-custom-text-field"
        outline
        @change="addEntry(sun, sunTime, 'sunTime')"
      ></v-text-field>
    </td>
    <td class="rowTotal">
      {{ rowTotal }}
    </td>
    <td class="row">
      <span
        @click="deleteRow"
        title="Delete Row"
        class="delete-row"
      >
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
    'taskId',
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
      taskName: '',
      clientId: '',
      clientName: '',
      monTime: '',
      tueTime: '',
      wedTime: '',
      thuTime: '',
      friTime: '',
      satTime: '',
      sunTime: '',
      rowTotal: '',
      loading: true,
      rowActive: true
    }
  },
  computed: {
    loaded: function() {
      return {
        loaded: !this.loading
      }
    }
  },
  methods: {
    getRow: function(monday) {
      // Get times for this user, this project & this task within current week
      let weekTimes = [];
      let sunday = moment(monday).add(6, 'days').format('YMMDD');
      var timesRef = db.collection('times');
      var timesWeek = timesRef
        .where('date', '>=', monday)
        .where('date', '<=', sunday)
        .where('taskId', '==', this.taskId)
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
          else {
            this[day + 'Time'] = '';
          }
        });

        // Update total number of hours for that row
        this.rowTotal = total;
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    },
    addEntry: function(day, hours, dayInput) {
      // this[dayInput] = this[dayInput].toString();
      if (hours.includes(':')) {
        hours = moment.duration(hours).asHours();
      }
      else {
        this[dayInput] = moment().startOf('day').add(hours, 'hours').format('H:mm');
      }

      // Get time for that day, project, task & user
      var timeDay = db.collection('times')
      .where('date', '==', day)
      .where('projectId', '==', this.projectId)
      .where('taskId', '==', this.taskId)
      .where('userId', '==', this.$store.state.userId);
      timeDay.get()
      .then((querySnapshot) => {
        if (querySnapshot.size) {
          // If there's already a time entry for this day, project, task and user, then update it
          querySnapshot.forEach((doc) => {
            // If user entered 0, delete that entry
            if ((hours === 0) || (hours === '0:0') || (hours === '0:00') || (hours === '00:00')) {
              this[dayInput] = '';
              doc.ref.delete().then(function() {
              })
              .catch(function(error) {
                console.error("Error removing document: ", error);
              });
            }
            else {
              doc.ref.set(
              {
                hours: hours.toString()
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
            }
          });
        }
        else {
          // If no entry was found, create a new one
          var timesRef = db.collection('times');
          timesRef.add({
            date: day,
            hours: hours,
            projectId: this.projectId,
            taskId: this.taskId,
            userId: this.$store.state.userId
          })
          .then(function(docRef) {
            //console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
        }

        // Update total for this row
        var total = 0;
        ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach(day => {
          total += (parseInt(this[day + 'Time'])) ? parseInt(this[day + 'Time']) : 0;
        });
        this.rowTotal = (total) ? total : 0;
      })
      .catch(function(error) {
      });
    },
    classObject(day) {
      return {
        today: moment(this.$store.state.today).format('YMMDD') == day
      };
    },
    deleteRow() {
      // Remove entries for this row from Firebase
      var timesRef = db.collection('times');
      var timesWeek = timesRef
        .where('date', '>=', this.mon)
        .where('date', '<=', this.sun)
        .where('taskId', '==', this.taskId)
        .where('projectId', '==', this.projectId)
        .where('userId', '==', this.$store.state.userId);
      timesWeek.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

      // Remove row from DOM
      this.rowActive = false;
    }
  },
  mounted() {
    // Get client id & project name for this project
    var project = db.collection('projects').doc(this.projectId);
    project.get().then((doc) => {
      if (doc.exists) {
        this.projectName = doc.data().projectName;
        this.clientId = doc.data().clientId;

        // Get client name for this project
        var client = db.collection('clients').doc(this.clientId);
        client.get().then((doc) => {
          if (doc.exists) {
            this.clientName = doc.data().clientName;
            
            // Display the row
            this.loading = false;
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

    // Get task name for this project task (information provided = task id)
    var tasks = db.collection('tasks').doc(this.taskId);
    tasks.get().then((doc) => {
      if (doc.exists) {
        this.taskName = doc.data().taskName;
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });

    // Get times for this user, this project & this task within this week
    this.getRow(this.mon);

    // User used "Previous", "Current" or "Next Week" button (from Home.vue component)
    EventBus.$on('changeWeek', monRaw => {

      // Update all days of the week in the component's logic
      this.mon = monRaw.format('YMMDD');
      this.tue = moment(monRaw).add(1, 'days').format('YMMDD');
      this.wed = moment(monRaw).add(2, 'days').format('YMMDD');
      this.thu = moment(monRaw).add(3, 'days').format('YMMDD');
      this.fri = moment(monRaw).add(4, 'days').format('YMMDD');
      this.sat = moment(monRaw).add(5, 'days').format('YMMDD');
      this.sun = moment(monRaw).add(6, 'days').format('YMMDD');

      // Load time entries for that week
      this.getRow(monRaw.format('YMMDD'));
    });
  }
}
</script>

<style scoped>
td {
  visibility: hidden;
}

tr.loaded td {
  visibility: visible;
}
.delete-row {
  cursor: pointer;
} 
</style>