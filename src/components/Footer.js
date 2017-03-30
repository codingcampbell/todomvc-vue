import Vue from 'vue';
import Store from '../Store';

export default Vue.extend({
  name: 'Footer',
  
  computed: {
    itemsLeft() {
      return Store.activeTodos.length;
    },
  },

  methods: {
    clearCompleted() {
      Store.$emit('clear-completed');
    },
  },

  render() {
    return <footer class="footer">
      <span class="todo-count"><strong>{this.itemsLeft}</strong> {this.itemsLeft === 1 ? 'item' : 'items'} left</span>
      <ul class="filters">
        <li>
          <a class={{selected: !Store.filter}} href="#/">All</a>
        </li>
        <li>
          <a class={{selected: Store.filter === 'active'}} href="#/active">Active</a>
        </li>
        <li>
          <a class={{selected: Store.filter === 'completed'}} href="#/completed">Completed</a>
        </li>
      </ul>
      { Store.completedTodos.length === 0 ? null : (
        <button class="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
      )}
    </footer>;
  }
});
