<template>
  <div>
    <!-- <v-btn
      @click.stop="dialog = true"
    >
      CACA
    </v-btn> -->
    <v-dialog
      v-model="dialog"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      dialog: state => state.modal.dialog
    })
  },
  methods: {
    closeDialog: function() {
      this.$store.commit('modal/setDialogState', false);
    }
  }
  // watch: {
  //   dialog: function (val) {
  //      alert("yes, computed property changed")
  //    }
  // },
  // data() {
  //   return {
  //     dialog: false
  //   }
  // },
  // mounted() {
  //   console.log(this.$store.state.modal.dialog);
  //   this.$store.commit('modal/setDialogState', true);
  //   setTimeout(()=> {
  //     console.log(this.$store.state.modal.dialog);
  //   }, 2000);
  // }
  // mounted() {
  //   console.log(this.dialog);
  //   setTimeout(function() {
  //     this.dialog = true;
  //     console.log(this.dialog);
  //   }, 2000);
  // }
}
</script>

<style lang="scss">

</style>
