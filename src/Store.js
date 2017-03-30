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

  this.save();
};

const removeTodo = function(todoToRemove) {
  this.todos = this.todos.filter(todo => todo !== todoToRemove);
};

const clearCompleted = function() {
  this.todos = this.todos.filter(todo => !todo.completed);
};

const setAllTodos = function(completed) {
  this.todos.forEach(todo => { todo.completed = completed; });
};

const Store = Vue.extend({
  name: 'Store',
  data() {
    return {
      inputTask: '',
      todos: [],
      filter: null,
    };
  },

  computed: {
    activeTodos() {
      return this.todos.filter(todo => !todo.completed);
    },

    completedTodos() {
      return this.todos.filter(todo => todo.completed);
    },

    allTodosComplete() {
      return this.completedTodos.length === this.todos.length;
    },
  },

  methods: {
    load() {
      try {
        this.todos = JSON.parse(window.sessionStorage.todos);
      } catch (e) {}

      this.getFilterFromURL();
    },

    save() {
      try {
        window.sessionStorage.todos = JSON.stringify(this.todos);
      } catch (e) {}
    },

    getFilterFromURL() {
      const hash = window.location.hash.slice(2);

      if (hash === 'active' || hash === 'completed') {
        this.filter = hash;
      } else {
        this.filter = null;
      }
    },
  },

  created() {
    this.$on('add-todo', addTodo.bind(this));
    this.$on('remove-todo', removeTodo.bind(this));
    this.$on('clear-completed', clearCompleted.bind(this));
    this.$on('mark-all-complete', setAllTodos.bind(this, true));
    this.$on('mark-all-incomplete', setAllTodos.bind(this, false));

    window.addEventListener('hashchange', this.getFilterFromURL);

    this.load();

    this.$watch('todos', this.save, { deep: true });
  }
});

export default new Store();
