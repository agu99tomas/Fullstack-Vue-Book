<template>
  <div class="container is-fluid">
    <CalendarWeek />
    <CalendarEntry />
  </div>
</template>

<script>
import CalendarEntry from "./app/components/CalendarEntry.vue";
import CalendarWeek from "./app/components/CalendarWeek.vue";

export default {
  name: "App",
  components: {
    CalendarWeek,
    CalendarEntry,
  },
};
</script>

<style scoped>
.container {
  margin-top: 1.5vh;
}
</style>
