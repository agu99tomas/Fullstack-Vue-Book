
const inputForm = {
  template: `
    <div class="input-form">
        <form @submit="submitForm" class="ui form">

          <!-- NEW ITEM -->
          <div class="field">
            <label>New item</label>
            <input :value="newItem" @input="onInputChange" name="NEW_ITEM" type="text" placeholder="Add an Item!">
            <span style="float:right;">{{ newItemLength }}/20</span>
            <span style="color:red">{{ fieldErrors.newItem }}</span>
            <span v-if="isNewItemLimitExceeded" style="color:red;display:block;">Must be under twenty characters</span>
          </div>

          <!-- EMAIL -->
          <div class="field">
            <label>Email</label>
            <input :value="email" @input="onInputChange" name="EMAIL" type="email" placeholder="What's your email?">
            <span style="color:red">{{ fieldErrors.email }}</span>
          </div>

          <!-- URGENCY -->
          <div class="field">
            <label>Ungency</label>
            <select :value="urgency" @change="onInputChange" name="URGENCY" class="ui fluid search dropdown">
              <option disabled value="">Please select one</option>
              <option>Nonessential</option>
              <option>Moderate</option>
              <option>Urgent</option>
            </select>
            <span style="color:red">{{ fieldErrors.urgency }}</span>
            <span v-if="isNotUrgent"  style="color:red">Must be moderate to urgent</span>
          </div>

            <!-- TERMS AND CONDITIONS -->
            <div class="field">
              <div class="ui checkbox">
                <input :checked="termsAndConditions" @change="onInputChange" name="TERMS_AND_CONDITIONS" type="checkbox">
                <label>I accept the terms and conditions</label>
                <span style="color:red">{{ fieldErrors.termsAndConditions }}</span>
              </div>
            </div>

            <button v-if="saveStatus === 'SAVING'" disabled class="ui button"> Saving... </button>
            <button class="ui button" v-if="saveStatus === 'SUCCESS'" :disabled="isNewItemLimitExceeded || isNotUrgent">Saved! Submit another</button>
            <button class="ui button" v-if="saveStatus === 'ERROR'" :disabled="isNewItemLimitExceeded || isNotUrgent">Save Failed - Retry?</button>
            <button class="ui button" v-if="saveStatus === 'READY'" :disabled="isNewItemLimitExceeded || isNotUrgent">Submit</button>
            

        </form>
        <br>
        <div class="ui segment">
          <h4 class="ui header">Items</h4>
          <ul>
            <div v-if="loading" class="ui active inline loader"></div>
            <li v-for="item in items" class="item">{{ item }}</li>
          </ul>
        </div>
    </div>`,

  data() {
    return {
      fieldErrors: {
        newItem: undefined,
        email: undefined,
        urgency: undefined,
        termsAndConditions: undefined,
      },
      loading: false,
      saveStatus: "READY",
    };
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault();
      this.fieldErrors = this.validateForm(this.$store.state.fields);
      if (Object.keys(this.fieldErrors).length) return;

      const items = [...this.$store.state.items, this.$store.state.fields.newItem];
      this.saveStatus = "SAVING";
      this.$store
        .dispatch("saveItems", items)
        .then(() => {
          this.saveStatus = "SUCCESS";
        })
        .catch((err) => {
          console.log(err);
          this.saveStatus = "ERROR";
        });
    },
    validateForm(fields) {
      const errors = [];
      if (!fields.newItem) errors.newItem = "New Item Required";
      if (!fields.email) errors.email = "Email Required";
      if (!fields.urgency) errors.urgency = "Urgency Required";
      if (!fields.termsAndConditions) {
        errors.termsAndConditions = "Terms and conditions have to be approved";
      }
      if (fields.email && !this.isEmail(fields.email)) {
        errors.email = "Invalid Email";
      }
      return errors;
    },
    isEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    onInputChange(evt) {
      const element = evt.target;
      const value =
        element.name === "TERMS_AND_CONDITIONS"
          ? element.checked
          : element.value;

      this.$store.commit(`UPDATE_${element.name}`, value);
    },
  },
  computed: Vuex.mapGetters({
    newItem: "newItem",
    newItemLength: "newItemLength",
    isNewItemLimitExceeded: "isNewItemLimitExceeded",
    email: "email",
    urgency: "urgency",
    isNotUrgent: "isNotUrgent",
    termsAndConditions: "termsAndConditions",
    items: "items",
  }),

  created() {
    this.loading = true;
    this.$store
      .dispatch("loadItems")
      .then((response) => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

new Vue({
  el: "#app",
  store,
  components: {
    "input-form": inputForm,
  },
});
