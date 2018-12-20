<template>
  <div>

    <div class="week-nav-bar">

      <div class="week-title">
        <h1>{{ weekTitle }}</h1>
      </div>

      <nav>
        <v-btn @click="viewPreviousWeek" title="Previous Week">
          <v-icon dark>keyboard_arrow_left</v-icon>
        </v-btn>

        <v-btn @click="viewThisWeek" color="grey lighten-2" title="Jump to This Week">
          This week
        </v-btn>

        <v-btn @click="viewNextWeek" title="Next Week">
          <v-icon dark>keyboard_arrow_right</v-icon>
        </v-btn>

        <v-btn class="calendar-button" @click="showCalendar" title="Change Date">
          <v-icon dark>calendar_today</v-icon>
        </v-btn>

        <v-btn @click="switchDayMode" title="Day View">
          Day
        </v-btn>
        <v-btn @click="switchWeekMode" color="grey lighten-2" title="Week View">
          Week
        </v-btn>
      </nav>

    </div>

    <table class="project-row" ref="container">
      <tr>
        <th></th>
        <th title="Monday">
          Mon<span>{{ monShort }}</span>
        </th>
        <th title="Tuesday">
          Tue<span>{{ tueShort }}</span>
        </th>
        <th title="Wednesday">
          Wed<span>{{ wedShort }}</span>
        </th>
        <th title="Thursday">
          Thu<span>{{ thuShort }}</span>
        </th>
        <th title="Friday">
          Fri<span>{{ friShort }}</span>
        </th>
        <th title="Saturday">
          Sat<span>{{ satShort }}</span>
        </th>
        <th title="Sunday">
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
      monRaw: moment().startOf('isoWeek')
    }
  },
  computed: {
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
    },
    weekTitle: function() {
      return `${this.monRaw.format('DD')} - ${this.sunRaw.format('DD MMM Y')}`;
    }
  },
  mounted() {
    
    // Stores userID in store
    this.$store.commit('setUserId', fb.auth().currentUser.uid);

    // Get all rows for that week and user
    this.getRows(this.monLong);
  },
  methods: {
    viewNextWeek: function() {
      const newValue = this.monRaw.clone().add(1, 'weeks');
      this.monRaw = newValue;
      EventBus.$emit('changeWeek', this.monRaw);
    },
    viewPreviousWeek: function() {
      const newValue = this.monRaw.clone().subtract(1, 'weeks');
      this.monRaw = newValue;
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
    getRows: function(monday) {

      // Get rows for that week & that user
      let weekTimes = [];
      let sunday = moment(monday).add(6, 'days').format('YMMDD');
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
        console.log("Error getting documents: ", error);
      });
    },
    showCalendar: function() {
      alert("Not supported yet, but will be VERY soon!");
    },
    switchDayMode: function() {
      alert("Not supported yet, but will be VERY soon!");
    },
    switchWeekMode: function() {
      alert("Not supported yet, but will be VERY soon!");
    }
  }
}
</script>

<style lang="scss">
@import '../styles/main';
</style>