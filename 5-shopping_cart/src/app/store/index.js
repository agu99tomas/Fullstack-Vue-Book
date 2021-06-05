import Vue from 'vue';
import Vuex from 'vuex';
import product from './modules/product/index.js'
import cart from './modules/cart/index.js'

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    product,
    cart,
  },
});