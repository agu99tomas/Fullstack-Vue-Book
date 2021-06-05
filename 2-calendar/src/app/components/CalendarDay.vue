<template>
  <div class="box">
    <h1 class="title is-5" @click="setActiveDay(day.id)">
      {{ day.abbvTitle }}
    </h1>
    <div class="media-content">
      <div class="content">
        <div class="tags are-normal">
          <CalendarEvent
            v-for="(event, index) in day.events"
            :key="index"
            :event="event"
            :day="day"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarEvent from "./CalendarEvent.vue";
import { store } from "../store.js";

export default {
  name: "CalendarDay",
  props: ["day"],
  components: {
    CalendarEvent,
  },
  methods: {
    setActiveDay(dayId) {
      // evaluated when you explicitly call it
      store.setActiveDay(dayId);
    },
  },
};
</script>

<style scoped>
.title {
  cursor: pointer;
}
</style>
