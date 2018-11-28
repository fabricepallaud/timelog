<template>
  <tr>
    <td class="rowDescription">
      <strong>{{ projectName }}</strong> ({{ clientName }})<br>
      {{ task }}
    </td>
    <td>
      <v-text-field v-model="monTime" class="v-custom-text-field" outline @change="addEntry(mon)"></v-text-field>
    </td>
    <td>
      <v-text-field v-model="tueTime" class="v-custom-text-field" outline @change="addEntry(tue)"></v-text-field>
    </td>
    <td class="today">
      <v-text-field v-model="wedTime" class="v-custom-text-field" outline @change="addEntry(wed)"></v-text-field>
    </td>
    <td>
      <v-text-field v-model="thuTime" class="v-custom-text-field" outline @change="addEntry(thu)"></v-text-field>
    </td>
    <td>
      <v-text-field v-model="friTime" class="v-custom-text-field" outline @change="addEntry(fri)"></v-text-field>
    </td>
    <td>
      <v-text-field v-model="satTime" class="v-custom-text-field" outline @change="addEntry(sat)"></v-text-field>
    </td>
    <td>
      <v-text-field v-model="sunTime" class="v-custom-text-field" outline @change="addEntry(sun)"></v-text-field>
    </td>
    <td class="rowTotal">
      4:00
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

export default {
  props: [
    'projectId',
    'projectName',
    'clientId',
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
      clientName: '',
      monTime: '',
      tueTime: '',
      wedTime: '',
      thuTime: '',
      friTime: '',
      satTime: '',
      sunTime: ''
    }
  },
  methods: {
    addEntry: function(day) {
      alert(day);
      //var timesRef = db.collection('times');
      //var mon = timesRef.where('');
      /*
      timesRef.add({
        Date: day,
        Project: this.project,
        Task: this.task,
        User: this.user
      });
      */
    }
  },
  mounted() {
    //alert(this.task);
    /*
    console.log(this.projectId);
    console.log(this.projectName);
    console.log(this.clientId);
    console.log(this.task);
    console.log(this.$store.state.userId);
    console.log(this.mon);
    console.log(this.sun);
    */

    // Get client for this project
    var client = db.collection('clients').doc(this.clientId);
    client.get().then((doc) => {
      if (doc.exists) {
        this.clientName = doc.data().name;
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });

    // Get times for this user, this project & this task within this week
    var timesRef = db.collection('times');
    var timesWeek = timesRef
      .where('date', '>=', this.mon)
      .where('date', '<=', this.sun)
      .where('task', '==', this.task)
      .where('projectId', '==', this.projectId)
      .where('userId', '==', this.$store.state.userId);
    timesWeek.get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.data()); alert('a');
      });
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error);
    });

  }
}
</script>

<style></style>