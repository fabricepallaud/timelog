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

    <table class="project-rows" ref="container">
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
import moment from 'moment'
import NewRowForm from '@/components/NewRowForm.vue'
// import { mapState } from 'vuex'
import { mapState, mapMutations } from 'vuex'
import ProjectRow from '@/components/ProjectRow.vue'
import Vue from 'vue'
// import store from '../store.js';
import { db, fb } from '~/plugins/firebase'
// import { EventBus } from '@/components/event-bus.js'

export default {
  name: 'home',
  components: {
    // ProjectRow,
    NewRowForm
  },
  // data() {
  //   return {
  //     monRaw: store.state.currentWeek
  //   }
  // },
  computed: {
    ...mapState({
      setUserId: 'setUserId',
      monRaw: 'currentWeek',
      nextWeek: 'currentWeek'.clone().add(1, 'weeks'),
      previousWeek: 'currentWeek'.clone().subtract(1, 'weeks'),
      thisWeek: 'thisWeek',
      userId: 'userId'
    }),
    monShort: function () {
      return this.monRaw.format('DD MMM')
    },
    monLong: function () {
      return this.monRaw.format('YMMDD')
    },
    tueRaw: function () {
      return moment(this.monRaw).add(1, 'days')
    },
    tueShort: function () {
      return this.tueRaw.format('DD MMM')
    },
    tueLong: function () {
      return this.tueRaw.format('YMMDD')
    },
    wedRaw: function () {
      return moment(this.monRaw).add(2, 'days')
    },
    wedShort: function () {
      return this.wedRaw.format('DD MMM')
    },
    wedLong: function () {
      return this.wedRaw.format('YMMDD')
    },
    thuRaw: function () {
      return moment(this.monRaw).add(3, 'days')
    },
    thuShort: function () {
      return this.thuRaw.format('DD MMM')
    },
    thuLong: function () {
      return this.thuRaw.format('YMMDD')
    },
    friRaw: function () {
      return moment(this.monRaw).add(4, 'days')
    },
    friShort: function () {
      return this.friRaw.format('DD MMM')
    },
    friLong: function () {
      return this.friRaw.format('YMMDD')
    },
    satRaw: function () {
      return moment(this.monRaw).add(5, 'days')
    },
    satShort: function () {
      return this.satRaw.format('DD MMM')
    },
    satLong: function () {
      return this.satRaw.format('YMMDD')
    },
    sunRaw: function () {
      return moment(this.monRaw).add(6, 'days')
    },
    sunShort: function () {
      return this.sunRaw.format('DD MMM')
    },
    sunLong: function () {
      return this.sunRaw.format('YMMDD')
    },
    weekTitle: function () {
      // if (this.monRaw.format('Y') === this.sunRaw.format('Y')) {
      //   return `${this.monRaw.format('DD')} - ${this.sunRaw.format('DD MMM Y')}`
      // } else {
      //   return `${this.monRaw.format('DD MMM Y')} - ${this.sunRaw.format('DD MMM Y')}`
      // }
      return (this.monRaw.format('Y') === this.sunRaw.format('Y'))
        ? `${this.monRaw.format('DD')} - ${this.sunRaw.format('DD MMM Y')}`
        : `${this.monRaw.format('DD MMM Y')} - ${this.sunRaw.format('DD MMM Y')}`
    }
  },
  mounted() {
    // Stores userID in store
    // this.$store.commit('setUserId', fb.auth().currentUser.uid)
    this.setUserId(fb.auth().currentUser.uid)

    // Get all rows for that week and user
    this.getRows(this.monLong)

    // Update Home component's current week based on URL
    const routeYear = this.$route.params.year
    const routeMonth = this.$route.params.month
    const routeDay = this.$route.params.day
    if (routeYear && routeMonth && routeDay) {
      this.monRaw = moment(routeYear + routeMonth + routeDay)
    }

    // Redirect to current week's route
    const year = this.monRaw.format('Y')
    const month = this.monRaw.format('MM')
    const day = this.monRaw.format('DD')
    this.$router.push({
      path: `/week/${year}/${month}/${day}/`
    })
  },
  methods: {
    ...mapMutations({
      setCurrentWeek: 'setCurrentWeek'
    }),
    updateWeek: function (newWeek) {
      // Update:
      // (1) store's currentWeek variable, as well as
      // (2) Home component's current week to previous, this or next week
      // store.commit('setCurrentWeek', newWeek)
      this.setCurrentWeek(newWeek)
      this.monRaw = newWeek

      // Redirect to route of updated current week (next week)
      const year = newWeek.format('Y')
      const month = newWeek.format('MM')
      const day = newWeek.format('DD')
      this.$router.push({
        path: `/week/${year}/${month}/${day}/`
      })
    },
    viewNextWeek: function () {
      // Update store + Home component with next week
      // const nextWeek = store.state.currentWeek.clone().add(1, 'weeks')
      this.updateWeek(this.nextWeek)
    },
    viewPreviousWeek: function () {
      // Update store + Home component with previous week
      // const previousWeek = store.state.currentWeek.clone().subtract(1, 'weeks')
      this.updateWeek(this.previousWeek)
    },
    viewThisWeek: function () {
      // Update store + Home component with this week
      // const thisWeek = store.state.thisWeek
      this.updateWeek(this.thisWeek)
    },
    newRow: function (projectId, taskId, user) {
      // Create new instance of ProjectRow component for this project/task pair (and this user)
      const ProjectRowClass = Vue.extend(ProjectRow)
      const ProjectRowInstance = new ProjectRowClass({
        // store,
        db,
        moment,
        propsData: {
          projectId: projectId,
          taskId: taskId,
          mon: this.monLong,
          tue: this.tueLong,
          wed: this.wedLong,
          thu: this.thuLong,
          fri: this.friLong,
          sat: this.satLong,
          sun: this.sunLong
        }
      })
      ProjectRowInstance.$mount()
      this.$refs.container.appendChild(ProjectRowInstance.$el)

      // Add this project/task pair to this user in Firebase (userData collection)
      /*
      var userDataRef = db.collection('userdata');
      userDataRef.add({
        date: day,
        hours: hours,
        projectId: this.projectId,
        taskId: this.taskId,
        userId: this.$store.state.userId
      })
      .then(function (docRef) {
        //console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
      */
    },
    getRows: function (monday) {
      // Get rows for that week & that user
      const weekTimes = []
      const sunday = moment(monday).add(6, 'days').format('YMMDD')
      const timesRef = db.collection('times')
      const timesWeek = timesRef
        .where('date', '>=', monday)
        .where('date', '<=', sunday)
        .where('userId', '==', this.userId)
        // .where('userId', '==', this.$store.state.userId)
      timesWeek.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            weekTimes.push(doc.data())
          })

          // Group entries for each [Project - Task] unique combination
          // into separate arrays (for each row)
          let rows = {}
          for (const weekTime of weekTimes) {
            const key = `${weekTime.projectId}/${weekTime.taskId}`
            if (rows[key] !== undefined) {
              rows[key].push(weekTime)
            } else {
              rows[key] = [weekTime]
            }
          }
          rows = Object.values(rows)

          // Create a new instance of ProjectRow component for each row
          for (const row of rows) {
            this.newRow(
              row[0].projectId,
              row[0].taskId,
              this.userId
              // this.$store.state.userId
            )
          }

          // Potentially create extra instances for rows without data for current week
          /*
          */
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    },
    showCalendar: function () {
      alert('Not supported yet, but will be VERY soon!')
    },
    switchDayMode: function () {
      alert('Not supported yet, but will be VERY soon!')
    },
    switchWeekMode: function () {
      alert('Not supported yet, but will be VERY soon!')
    }
  }
}
</script>

<!-- <style lang="scss">
@import '../styles/main';
</style> -->
