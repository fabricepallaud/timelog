<template>
  <table>
    <tr>
      <th>
        M
        <span>
          {{ mon }}
        </span>
      </th>
      <th>
        Tu
        <span>
          {{ tue }}
        </span>
      </th>
      <th>
        W
        <span>
          {{ wed }}
        </span>
      </th>
      <th>
        Th
        <span>
          {{ thu }}
        </span>
      </th>
      <th>
        F
        <span>
          {{ fri }}
        </span>
      </th>
      <th>
        Sa
        <span>
          {{ sat }}
        </span>
      </th>
      <th>
        Su
        <span>
          {{ sun }}
        </span>
      </th>
    </tr>
    <tr>
      <td>
      </td>
    </tr>
  </table>
</template>

<script>
import moment from 'moment';

export default {
  props: ['project'],
  computed: {
    mon: function() {
      return moment(this.$store.state.currentWeek).format('DD MMM');
    },
    tue: function() {
      return moment(this.mon).add(1, 'days').format('DD MMM');
    },
    wed: function() {
      return moment(this.mon).add(2, 'days').format('DD MMM');
    },
    thu: function() {
      return moment(this.mon).add(3, 'days').format('DD MMM');
    },
    fri: function() {
      return moment(this.mon).add(4, 'days').format('DD MMM');
    },
    sat: function() {
      return moment(this.mon).add(5, 'days').format('DD MMM');
    },
    sun: function() {
      return moment(this.mon).add(6, 'days').format('DD MMM');
    }
  }
}
</script>

<style scoped>
table span {
  display: block;
  font-weight: normal;
}
td,
th {
  padding: 5px 10px;
  background: #f8f8f8;
}
</style>
