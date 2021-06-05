<template>
  <div class="columns is-variable is-1 ">
    <div class="column" v-for="day in sharedState.seedData" :key="day.id">
      <CalendarDay :day="day" />
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
import CalendarDay from "./CalendarDay.vue";

export default {
  name: "CalendarWeek",
  components: {
    CalendarDay,
  },
  data() {
    return {
      sharedState: store.state,
    };
  },
};
</script>

<style scoped></style>
