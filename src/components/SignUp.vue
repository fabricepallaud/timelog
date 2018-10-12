<template>
  <div class="sign_up">
    <h1>
      Sign Up
    </h1>
    <input type="text" v-model="email" placeholder="Email">
    <br>
    <input type="password" v-model="password" placeholder="Password">
    <br>
    <button @click="signUp">Sign Up</button>
    <span>
      Or go back to <router-link to="/Login">login</router-link>.
    </span>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home');
        },
        (error) => {
          alert('Oops. ' + error.message)
        }
      );
    }    
  },
}
</script>