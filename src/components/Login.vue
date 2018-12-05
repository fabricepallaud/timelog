<template>
  <div class="login">
    <h1>
      Log In
    </h1>

    <v-text-field
      v-model="email"
      label="Email"
      placeholder="titi@titi.com"
      box
    >
    </v-text-field>
    
    <v-text-field
      v-model="password"
      label="Password"
      placeholder="tititi"
      :type="'password'"
      box
    >
    </v-text-field>

    <v-checkbox
      label="Remember me"
      v-model="remember"
    ></v-checkbox>
    
    <v-btn @click="signIn">
      Sign In
    </v-btn>

  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data: function() {
    return {
      email: '',
      password: '',
      remember: false
    }
  },
  methods: {
    signIn: function() {
      if (this.remember) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(
          () => {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
              (user) => {
                this.$store.commit('setUserId', user.uid);
                this.$router.replace('home');
              },
              (error) => {
                console.log('Oops. ' + error.message);
              }
            );
          })
          .catch((error) => {
            console.log('Oops. ' + error.message);
          });
      }
      else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
          () => {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
              (user) => {
                this.$store.commit('setUserId', user.uid);
                this.$router.replace('home');
              },
              (error) => {
                console.log('Oops. ' + error.message);
              }
            );
          })
          .catch((error) => {
            console.log('Oops. ' + error.message);
          });
      }
    }
  }
}
</script>