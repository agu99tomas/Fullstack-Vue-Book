import { seedData } from "./seed.js";

export const store = {
  state: {
    seedData,
  },
  getActiveDay() {
    return this.state.seedData.find((day) => day.active); // day[active]
  },
  setActiveDay(dayId) {
    this.state.seedData.map((day) => {
      day.id === dayId ? (day.active = true) : (day.active = false);
    });
  },
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({ details: eventDetails, edit: false });
  },
  resetEditOfAllEvents() {
    this.state.seedData.map((day) => {
      day.events.map((event) => (event.edit = false));
    });
  },
  getEventObj(dayId, eventDetails) {
    const dayObj = this.state.seedData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find(
      (event) => event.details === eventDetails
    );
    return eventObj;
  },
  editEvent(dayId, eventDetails) {
    this.resetEditOfAllEvents();
    const eventObj = this.getEventObj(dayId, eventDetails);
    eventObj.edit = true;
  },
  updateEvent(dayId, orignalEventDetails, updatedEventDetails) {
    const eventObj = this.getEventObj(dayId, orignalEventDetails);
    eventObj.details = updatedEventDetails;
    eventObj.edit = false;
  },
  deleteEvent(dayId, eventDetails) {
    const dayObj = this.state.seedData.find((day) => day.id === dayId);
    const eventIndexToRemove = dayObj.events.findIndex(
      (event) => event.details === eventDetails
    );
    dayObj.events.splice(eventIndexToRemove, 1);
  },
};
