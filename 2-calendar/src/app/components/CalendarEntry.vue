<template>
  <div class="columns is-variable is-1">
    <div class="column is-3">
      <div class="box">
        <div id="alert" class="tag is-danger" v-if="error">
          You must type something first!
        </div>

        <div id="alert" class="tag is-info" v-if="!error">
          {{ titleOfActiveDay }}
        </div>

        <div class="field has-addons">
          <div class="control">
            <input
              v-model="eventDetails"
              class="input"
              type="text"
              :placeholder="'Add event to ' + titleOfActiveDay"
              @focus="ifExistRemoveError()"
            />
          </div>
          <div class="control">
            <a class="button is-info" @click="submitEvent(eventDetails)">
              <i class="fas fa-plus-circle"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "CalendarEntry",
  data() {
    return {
      eventDetails: "",
      error: false,
    };
  },
  computed: {
    titleOfActiveDay() {
      return store.getActiveDay().fullTitle;
    },
  },
  methods: {
    submitEvent(eventDetails) {
      if (eventDetails === "") {
        this.error = true;
        return;
      }
      store.submitEvent(eventDetails);
      this.eventDetails = "";
      this.error = false;
    },
    ifExistRemoveError() {
      if (this.error) this.error = false;
    },
  },
};
</script>

<style scoped>
#alert {
  margin-bottom: 10px !important;
}
</style>
