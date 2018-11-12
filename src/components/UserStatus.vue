<template>
  <div class="login_status">
    <!--<span v-if="userConnected">-->
    <span>
      Hi {{ userEmail }}!
      <a href="#" @click="logout">logout</a>
    </span>
    <!--<span v-else>-->
    <span>
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
      userConnected: '',
      userEmail: ''
    }
  },
  mounted() {
    this.userConnected = this.$store.state.userConnected;
    this.userEmail = this.$store.state.userEmail;
    //alert(this.userConnected);
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      })
    }
  }
}
</script>