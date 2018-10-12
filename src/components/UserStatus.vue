<template>
  <div class="login_status">
    Status: <span>connected / not connected</span>
    <router-link to="/Login">login</router-link>
    <router-link to="/Signup">signup</router-link>
    <a href="#" @click="logout">logout</a>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'userstatus',
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      })
    }
  }
}
</script>