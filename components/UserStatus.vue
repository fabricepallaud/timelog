<template>
  <div class="login_status">
    <span v-if="userConnected">
      {{ userEmail }}
      <span class="dot_separator">•</span>
      <a href="#" @click="logout">Log Out</a>
    </span>
    <span v-else>
      <router-link to="/Login">Login</router-link>
      <span class="dot_separator">•</span>
      <router-link to="/Signup">Signup</router-link>
    </span>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
// import store from '../store';

export default {
  name: 'userstatus',
  data() {
    return {
      userConnected: '',
      userEmail: ''
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userConnected = true
        this.userEmail = user.email
      } else {
        this.userConnected = false
      }
    })
  },
  methods: {
    logout: function () {
      this.userConnected = false
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style scoped>
.dot_separator {
  margin: 0 1em;
}
</style>
