import Vue from 'vue';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Store from './Store';

export default Vue.extend({
  name: 'App',

  methods: {
    clearCompleted() {
      Store.$emit('clear-completed');
    }
  },

  render() {
    return <section class="todoapp">
      <Header/>
      <TodoList/>
      {/* This footer should hidden by default and shown when there are todos */}
      <footer class="footer">
        {/* This should be `0 items left` by default */}
        <span class="todo-count"><strong>0</strong> item left</span>
        {/* Remove this if you don't implement routing */}
        <ul class="filters">
          <li>
            <a class="selected" href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        { Store.completedTodos.length === 0 ? null : (
          <button class="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
        )}
      </footer>
    </section>;
  }
});
