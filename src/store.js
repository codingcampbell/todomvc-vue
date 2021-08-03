import { readonly, reactive, computed } from 'vue'

const state = reactive({
  todos: [],
  filter: null,

  // getters
  activeTodos: computed(() => state.todos.filter(todo => !todo.completed)),
  completedTodos: computed(() => state.todos.filter(todo => todo.completed)),
  allTodosComplete: computed(() => state.completedTodos.length === state.todos.length),
});

export default {
  state: readonly(state),
  addTodo({ task, completed }) {
    state.todos.push({
      id: String(Math.random()).slice(2),
      task,
      completed: !!completed,
    });
  },
  removeTodo(todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  editTodo({ todo, task }) {
    state.todos
      .filter(t => t.id === todo.value.id)
      .forEach(t => t.task = task);
  },

  editAllTodos(data) {
    state.todos.forEach(todo => Object.assign(todo, data));
  },

  toggleTodo({ todo, completed }) {
    state.todos
      .filter(t => t.id === todo.value.id)
      .forEach(t => t.completed = completed);
  },

  setTodos({ todos }) {
    state.todos = todos;
  },

  clearCompletedTodos() {
    state.todos = state.todos.filter(todo => !todo.completed);
  },

  getFilterFromURL() {
    const hash = window.location.hash.slice(2);

    if (hash === 'active' || hash === 'completed') {
      state.filter = hash;
    } else {
      state.filter = null;
    }
  },

  loadTodos() {
    try {
      state.todos = JSON.parse(window.sessionStorage.todos);
    } catch (e) {}
  },

  saveTodos() {
    try {
      window.sessionStorage.todos = JSON.stringify(state.todos);
    } catch (e) {}
  },
};
