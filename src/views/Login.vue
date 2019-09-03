<template>
  <div class="login">
    <h1>
      Log In
    </h1>

    <v-form @submit.prevent="signIn">
      <v-text-field
        v-model="email"
        label="Email"
        :disabled="inputDisabled"
        box
        v-tooltip="{
          content: 'Demo credentials added (normal sign in/up still possible)',
          show: showTooltip,
          trigger: 'manual'
        }"
      >
      </v-text-field>
      
      <v-text-field
        v-model="password"
        label="Password"
        :type="'password'"
        :disabled="inputDisabled"
        box
      >
      </v-text-field>

      <v-checkbox
        label="Remember me"
        v-model="remember"
      ></v-checkbox>
      
      <v-btn
        type="submit"
        color="primary"
        dark
      >
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
      remember: false,
      inputDisabled: true,
      showTooltip: false
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
            alert('Oops. ' + error.message);
          });
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.email = 'fabrice@fabrice.com';
      this.password = 'fabrice';
      this.remember = true;
      this.inputDisabled = false;
      this.showTooltip = true;
      setTimeout(() => {
        this.showTooltip = false;
      }, 4000); 
    }, 1000);
    
  }
}
</script>

<style lang="scss" scoped>
.toasted .primary,
.toasted.toasted-primary {
  min-height: 58px;
  line-height: 1.1em;
  padding: 0 40px;
  font-size: 16px;
}
</style>
