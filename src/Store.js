export default {
  strict: process.env.NODE_ENV !== 'production',

  state: {
    todos: [],
    filter: null,
  },

  mutations: {
    addTodo(state, { task, completed }) {
      state.todos.push({
        id: String(Math.random()).slice(2),
        task,
        completed: !!completed,
      });
    },

    removeTodo(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    },

    editTodo(state, { todo, task }) {
      todo.task = task;
    },

    editAllTodos(state, data) {
      state.todos.forEach(todo => Object.assign(todo, data));
    },

    toggleTodo(state, { todo, completed }) {
      todo.completed = completed;
    },

    setTodos(state, { todos }) {
      state.todos = todos;
    },

    clearCompletedTodos(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },

    getFilterFromURL(state) {
      const hash = window.location.hash.slice(2);

      if (hash === 'active' || hash === 'completed') {
        state.filter = hash;
      } else {
        state.filter = null;
      }
    },
  },

  actions: {
    loadTodos({ commit }) {
      try {
        commit('setTodos', { todos: JSON.parse(window.sessionStorage.todos) });
      } catch (e) {}
    },

    saveTodos({ state }) {
      try {
        window.sessionStorage.todos = JSON.stringify(state.todos);
      } catch (e) {}
    },
  },

  getters: {
    activeTodos: state => state.todos.filter(todo => !todo.completed),

    completedTodos: state => state.todos.filter(todo => todo.completed),

    allTodosComplete: (state, getters) => getters.completedTodos.length === state.todos.length,
  }
};
