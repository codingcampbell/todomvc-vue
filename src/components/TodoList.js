import Vue from 'vue';
import Store from '../Store';
import Todo from './Todo';

export default Vue.extend({
  name: 'TodoList',

  computed: {
    todos() {
      if (!Store.filter) {
        return Store.todos;
      }

      return Store.todos.filter(todo => {
        if (Store.filter === 'active') {
          return !todo.completed;
        }

        if (Store.filter === 'completed') {
          return todo.completed;
        }

        return true;
      });
    }
  },

  methods: {
    handleToggle(e) {
      Store.$emit(Store.allTodosComplete ? 'mark-all-incomplete' : 'mark-all-complete');
    },
  },

  render() {
    return <section class="main">
      <input class="toggle-all" type="checkbox" domPropsChecked={Store.allTodosComplete} onClick={this.handleToggle}/>
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">{ this.todos.map((todo, index) =>
        <Todo key={index + '-' + todo.task} todo={todo}/>
      )}</ul>
    </section>;
  }
});
