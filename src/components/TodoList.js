import Vue from 'vue';
import { mapGetters, mapState }  from 'vuex';
import Todo from './Todo';

export default Vue.extend({
  name: 'TodoList',

  computed: {
    todos() {
      if (this.filter === 'active') {
        return this.activeTodos;
      }

      if (this.filter === 'completed') {
        return this.completedTodos;
      }

      return this.$store.state.todos;
    },
    ...mapState(['filter']),
    ...mapGetters(['activeTodos', 'completedTodos', 'allTodosComplete']),
  },

  methods: {
    handleToggle(e) {
      this.$store.commit('editAllTodos', { completed: !this.allTodosComplete });
    },
  },

  render() {
    return <section class="main">
      <input class="toggle-all" type="checkbox" domPropsChecked={this.allTodosComplete} onClick={this.handleToggle}/>
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">{ this.todos.map((todo, index) =>
        <Todo key={todo.id} todo={todo}/>
      )}</ul>
    </section>;
  }
});
