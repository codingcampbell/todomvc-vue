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

    filterClear(e) {
      e.preventDefault();
      Store.filter = null;
    },

    filterActive(e) {
      e.preventDefault();
      Store.filter = 'active';
    },

    filterCompleted(e) {
      e.preventDefault();
      Store.filter = 'completed';
    },
  },

  render() {
    /* This footer should hidden by default and shown when there are todos */
    return <footer class="footer">
      <span class="todo-count"><strong>{this.itemsLeft}</strong> {this.itemsLeft === 1 ? 'item' : 'items'} left</span>
      <ul class="filters">
        <li>
          <a class={{selected: !Store.filter}} href="#/" onClick={this.filterClear}>All</a>
        </li>
        <li>
          <a class={{selected: Store.filter === 'active'}} href="#/active" onClick={this.filterActive}>Active</a>
        </li>
        <li>
          <a class={{selected: Store.filter === 'completed'}} href="#/completed" onClick={this.filterCompleted}>Completed</a>
        </li>
      </ul>
      { Store.completedTodos.length === 0 ? null : (
        <button class="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
      )}
    </footer>;
  }
});
