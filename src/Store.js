import Vue from 'vue';

window.Vue = Vue;

const Store = Vue.extend({
  name: 'Store',
  data() {
    return {
      inputTask: '',
    };
  }
});

export default new Store();
