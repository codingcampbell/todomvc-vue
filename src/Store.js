import Vue from 'vue';

const addTodo = function() {
  if (!this.inputTask.length) {
    return;
  }

  this.todos.push({
    task: this.inputTask,
    completed: false,
  });

  this.inputTask = '';
};

const removeTodo = function(todoToRemove) {
  this.todos = this.todos.filter(todo => todo !== todoToRemove);
};

const Store = Vue.extend({
  name: 'Store',
  data() {
    return {
      inputTask: '',
      todos: [],
      mouseDownTarget: null,
    };
  },

  created() {
    this.$on('add-todo', addTodo.bind(this));
    this.$on('remove-todo', removeTodo.bind(this));

    window.addEventListener('mousedown', e => {
      this.mouseDownTarget = e.target;
    });
  }
});

export default new Store();
