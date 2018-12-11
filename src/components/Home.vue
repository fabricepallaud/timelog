<template>
  <div>

    <nav>
      <v-btn @click="viewPreviousWeek" dark>
        <v-icon dark>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn @click="viewThisWeek" dark>
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
          Mon<span>{{ monShort }}</span>
        </th>
        <th>
          Tue<span>{{ tueShort }}</span>
        </th>
        <th>
          Wed<span>{{ wedShort }}</span>
        </th>
        <th>
          Thu<span>{{ thuShort }}</span>
        </th>
        <th>
          Fri<span>{{ friShort }}</span>
        </th>
        <th>
          Sat<span>{{ satShort }}</span>
        </th>
        <th>
          Sun<span>{{ sunShort }}</span>
        </th>
        <th></th>
        <th></th>
      </tr>
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
        <td>          
        </td>
        <td>          
        </td>
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
import { EventBus } from './event-bus.js';

export default {
  name: 'home',
  components: {
    ProjectRow,
    NewRowForm
  },
  data() {
    return {
      monRaw: moment().startOf('isoWeek'),
      thisWeek: moment().startOf('isoWeek')
    }
  },
  computed: {
    /*
    monRaw: function() {
      return moment().startOf('isoWeek');
    },
    */
    monShort: function() {
      return this.monRaw.format('DD MMM');
    },
    monLong: function() {
      return this.monRaw.format('YMMDD');
    },
    tueRaw: function() {
      return moment(this.monRaw).add(1, 'days');
    },
    tueShort: function() {
      return this.tueRaw.format('DD MMM');
    },
    tueLong: function() {
      return this.tueRaw.format('YMMDD');
    },
    wedRaw: function() {
      return moment(this.monRaw).add(2, 'days');
    },
    wedShort: function() {
      return this.wedRaw.format('DD MMM');
    },
    wedLong: function() {
      return this.wedRaw.format('YMMDD');
    },
    thuRaw: function() {
      return moment(this.monRaw).add(3, 'days');
    },
    thuShort: function() {
      return this.thuRaw.format('DD MMM');
    },
    thuLong: function() {
      return this.thuRaw.format('YMMDD');
    },
    friRaw: function() {
      return moment(this.monRaw).add(4, 'days');
    },
    friShort: function() {
      return this.friRaw.format('DD MMM');
    },
    friLong: function() {
      return this.friRaw.format('YMMDD');
    },
    satRaw: function() {
      return moment(this.monRaw).add(5, 'days');
    },
    satShort: function() {
      return this.satRaw.format('DD MMM');
    },
    satLong: function() {
      return this.satRaw.format('YMMDD');
    },
    sunRaw: function() {
      return moment(this.monRaw).add(6, 'days');
    },
    sunShort: function() {
      return this.sunRaw.format('DD MMM');
    },
    sunLong: function() {
      return this.sunRaw.format('YMMDD');
    }
  },
  mounted() {
    // Stores userID in store
    this.$store.commit('setUserId', fb.auth().currentUser.uid);

    // Get rows for that week & that user
    let weekTimes = [];
    var timesRef = db.collection('times');
    var timesWeek = timesRef
      .where('date', '>=', this.monLong)
      .where('date', '<=', this.sunLong)
      .where('userId', '==', this.$store.state.userId);
    timesWeek.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        weekTimes.push(doc.data());
      });      

      // Group entries for each [Project - Task] unique combination into separate arrays (for each row)
      var rows = {};
      for (var weekTime of weekTimes) {
        var key = `${weekTime.projectId}/${weekTime.task}`;
        if (rows[key] !== undefined) {
          rows[key].push(weekTime);
        }
        else {
          rows[key] = [weekTime];
        }
      }
      rows = Object.values(rows);

      // Create a new instance of ProjectRow component for each row
      for (var row of rows) {
        this.newRow(
          row[0].projectId,
          row[0].task,
          this.$store.state.userId
        );
      }
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error);
    });
  },
  methods: {
    viewNextWeek: function() {
      this.monRaw = this.monRaw.add(1, 'weeks');
      EventBus.$emit('changeWeek', this.monRaw);      
    },
    viewPreviousWeek: function() {
      this.monRaw = this.monRaw.subtract(1, 'weeks');
      EventBus.$emit('changeWeek', this.monRaw);
    },
    viewThisWeek: function() {
      this.monRaw = this.$store.state.thisWeek;
      EventBus.$emit('changeWeek', this.monRaw);
    },
    newRow: function(projectId, task, user) {
      let ProjectRowClass = Vue.extend(ProjectRow);
      let ProjectRowInstance = new ProjectRowClass({
        store,
        db,
        moment,
        propsData: {
          projectId: projectId,
          task: task,
          mon: this.monLong,
          tue: this.tueLong,
          wed: this.wedLong,
          thu: this.thuLong,
          fri: this.friLong,
          sat: this.satLong,
          sun: this.sunLong
        }
      });
      ProjectRowInstance.$mount();
      this.$refs.container.appendChild(ProjectRowInstance.$el);
    },
    getRows: function(monday, sunday) {

      // Get rows for that week & that user
      let weekTimes = [];
      var timesRef = db.collection('times');
      var timesWeek = timesRef
        .where('date', '>=', monday)
        .where('date', '<=', sunday)
        .where('userId', '==', this.$store.state.userId);
      timesWeek.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          weekTimes.push(doc.data());
        });      

        // Group entries for each [Project - Task] unique combination into separate arrays (for each row)
        var rows = {};
        for (var weekTime of weekTimes) {
          var key = `${weekTime.projectId}/${weekTime.task}`;
          if (rows[key] !== undefined) {
            rows[key].push(weekTime);
          }
          else {
            rows[key] = [weekTime];
          }
        }
        rows = Object.values(rows);

        // Create a new instance of ProjectRow component for each row
        for (var row of rows) {
          this.newRow(
            row[0].projectId,
            row[0].task,
            this.$store.state.userId
          );
        }
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
    }
  }
}
</script>

<style>
@import '../styles/main.scss';

.project-row td {
  border-top: 1px solid #ddd;
}
</style>