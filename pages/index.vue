<template>
  <div id="app">

    <div v-cloak>

      <!-- Spinner appears temporarily while app loads -->
      <div class="spinner"></div>

      <div class="app-content" v-cloak>

        <v-app>

          <v-toolbar color="light-blue lighten-5">
            <v-toolbar-title>
              <!-- <a @click="goToHome">Timelog</a> -->
              <router-link to="/home">Timelog</router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- <user-status></user-status> -->

            <v-spacer></v-spacer>

            <v-toolbar-items>
              <v-btn flat>
                <router-link to="/projects">Projects</router-link>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-content>
            <v-container fluid>
              <router-view></router-view>
            </v-container>
          </v-content>

          <!--<v-footer app></v-footer>-->

        </v-app>

      </div> <!-- /app-content -->

    </div> <!-- /v-cloak -->

  </div>
</template>

<script>
// import UserStatus from '@/components/UserStatus.vue';
// import Home from '@/pages/Home.vue';

export default {
  // components: {
  //   UserStatus
  // },
  methods: {
    goToHome: function () {
      window.location.href = '/'
    }
  }
}
</script>

<style lang="scss">
html {
  font-size: 16px !important;
  overflow-y: scroll;
}

body {
  margin: 0;
}

[v-cloak] .app-content,
.spinner {
  display: none;
}

[v-cloak] .spinner {
  display: block;
}

.spinner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url('~assets/images/three-dots.svg');
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 10px;
}
</style>
