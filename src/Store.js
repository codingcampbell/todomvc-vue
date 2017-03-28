import Vue from 'vue';

window.Vue = Vue;

const Store = Vue.extend({
  name: 'store',
  data() {
    return {
      inputTask: '',
    };
  }
});

export default new Store();
