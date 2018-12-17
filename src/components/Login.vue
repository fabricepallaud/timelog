<template>
  <div class="login">
    <h1>
      Log In
    </h1>

    <v-form @submit="signIn">
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

      <v-checkbox
        label="Remember me"
        v-model="remember"
      ></v-checkbox>
      
      <v-btn type="submit">
        Sign In
      </v-btn>
    </v-form>
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

      // If "Remember" option is checked
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
                this.$store.commit('setUserId', user.user.uid);
                this.$router.replace('home');
              },
              (error) => {
                alert('Oops. ' + error.message);
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