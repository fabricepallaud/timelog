<template>
  <div class="sign_up">
    <h1>
      Sign Up
    </h1>

    <v-form @submit="signUp">
      <v-text-field
        v-model="email"
        label="Email"
        box
      >
      </v-text-field>
      
      <v-text-field
        v-model="password"
        label="Password"
        :type="'password'"
        box
      >
      </v-text-field>
      
      <v-btn type="submit">
        Sign Up
      </v-btn>
      <span>
        Or go back to <router-link to="/Login">Login</router-link>.
      </span>
    </v-form>
    
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
          this.$store.commit('setUserId', user.user.uid);
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