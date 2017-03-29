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

  try {
    window.sessionStorage.todos = JSON.stringify(this.todos);
  } catch (e) {}
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

    try {
      this.todos = JSON.parse(window.sessionStorage.todos);
    } catch (e) {}
  }
});

export default new Store();
