<template>
  <div class="login_status">
    <span v-if="userConnected">
      User connected
      <span class="dot_separator">•</span>
      <a href="#" @click="logout">logout</a>
    </span>
    <span v-else>
      <router-link to="/Login">login</router-link>
      <router-link to="/Signup">signup</router-link>
    </span>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'userstatus',
  data() {
    return {
      userConnected: ''
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userConnected = true;
      }
      else {
        this.userConnected = false;
      }
    });
  },
  methods: {
    logout: function() {
      this.userConnected = false;
      //this.$store.commit('setUserConnected', false);
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
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