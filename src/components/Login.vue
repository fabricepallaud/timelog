<template>
  <div class="login">
    <h1>
      Log In
    </h1>
    <input type="text" v-model="email" placeholder="Email">
    <br>
    <input type="password" v-model="password" placeholder="Password">
    <br>
    <button @click="signIn">Sign In</button>
    <span>
      You don't have an account? <router-link to="/Signup">signup</router-link>.
    </span>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home');
        },
        (err) => {
          alert('Oops. ' + error.message);
        }
      );
    }
  }
}
</script>