<template>
  <div class="event">
    <span
      v-if="!event.edit"
      class="tag"
      :style="getEventBackgroundColor"
      @click="editEvent(day.id, event.details)"
    >
      {{ event.details }}
      <button
        class="delete is-small"
        @click="deleteEvent(day.id, event.details)"
      ></button>
    </span>

    <div v-if="event.edit" class="edit-panel">
      <input
        type="text"
        class="input is-small"
        :placeholder="event.details"
        v-model="newEventDetails"
      />
      <button
        class="button is-small is-fullwidth"
        @click="updateEvent(day.id, event.details)"
      >
        <i class="fas fa-save"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "CalendarEvent",
  props: ["event", "day"],
  data() {
    return {
      newEventDetails: "",
    };
  },
  computed: {
    getEventBackgroundColor() {
      const colors = ["#b8e994", "#eccc68", "#ffdd59", "#4bcffa", "#ff9ff3"];
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      return `background-color: ${randomColor}`;
    },
  },
  methods: {
    editEvent(dayId, eventDetails) {
      store.editEvent(dayId, eventDetails);
    },
    updateEvent(dayId, orignalEventDetails) {
      if (this.newEventDetails === "")
        this.newEventDetails = orignalEventDetails;
      store.updateEvent(dayId, orignalEventDetails, this.newEventDetails);
      this.newEventDetails = "";
    },
    deleteEvent(dayId, eventDetails) {
      store.deleteEvent(dayId, eventDetails);
    },
  },
};
</script>

<style scoped>
.event {
  width: 100%;
}
.edit-panel {
  margin-bottom: 10px;
}
</style>
