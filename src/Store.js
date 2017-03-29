import Vue from 'vue';
import * as util from './util';

const addTodo = function() {
  if (!this.inputTask.length) {
    return;
  }

  this.todos.push({
    id: util.id(),
    task: this.inputTask,
    completed: false,
  });

  this.inputTask = '';
};

const Store = Vue.extend({
  name: 'Store',
  data() {
    return {
      inputTask: '',
      todos: [],
    };
  },

  created() {
    this.$on('add-todo', addTodo.bind(this));
  }
});

export default new Store();
