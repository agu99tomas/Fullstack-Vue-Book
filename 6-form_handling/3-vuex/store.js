const state = {
  fields: {
    newItem: "",
    email: "",
    urgency: "",
    termsAndConditions: false,
  },
  items: [],
};
// Mutations: The only way to actually change state in a Vuex store is by committing a mutation.
const mutations = {
  UPDATE_NEW_ITEM(state, payload) {
    state.fields.newItem = payload;
  },

  UPDATE_EMAIL(state, payload) {
    state.fields.email = payload;
  },

  UPDATE_URGENCY(state, payload) {
    state.fields.urgency = payload;
  },

  UPDATE_TERMS_AND_CONDITIONS(state, payload) {
    state.fields.termsAndConditions = payload;
  },

  UPDATE_ITEMS(state, payload) {
    state.items = payload;
  },

  CLEAR_FIELDS(state, payload) {
    state.fields.newItem = "";
    state.fields.email = "";
    state.fields.urgency = "";
    state.fields.termsAndConditions = "";
  },
};

const actions = {
  loadItems(context, payload) {
    return new Promise(
      (resolve, reject) => {
        apiClient.loadItems().then((items) => {
          context.commit("UPDATE_ITEMS", items);
          resolve(items);
        });
      },
      (error) => {
        reject(error);  
      }
    );
  },
  saveItems(context, payload) {
    return new Promise((resolve, reject)=>{
      const items = payload;
      apiClient.saveItems(payload).then((response) => {
        context.commit("UPDATE_ITEMS", items);
        context.commit("CLEAR_FIELDS");
        resolve(response);
      });
    }, (error)=>{
      reject(error);
    })

  },
};

// Gettters: Compute derived state based on store state.
const getters = {
  // newItem
  newItem: (state) => state.fields.newItem,
  newItemLength: (state) => state.fields.newItem.length,
  isNewItemLimitExceeded: (state) => state.fields.newItem.length >= 20,
  // email
  email: (state) => state.fields.email,
  // ugency
  urgency: (state) => state.fields.urgency,
  isNotUrgent: (state) => state.fields.urgency === "Nonessential",
  // termsAndConditions
  termsAndConditions: (state) => state.fields.termsAndConditions,
  // items
  items: (state) => state.items,
};

window.store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

// API
let apiClient = {
  loadItems: function () {
    return {
      then: function (cb) {
        setTimeout(() => {
          cb(JSON.parse(localStorage.items || "[]"));
        }, 1000);
      },
    };
  },

  saveItems: function (items) {
    const success = !(this.count++ % 2);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) return reject([success]);
        localStorage.items = JSON.stringify(items);
        return resolve([success]);
      }, 1000);
    });
  },

  count: 1,
};
