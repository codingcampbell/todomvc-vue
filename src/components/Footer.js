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

    updateFilter() {
      Store.getFilterFromURL();
    }
  },

  render() {
    /* This footer should hidden by default and shown when there are todos */
    return <footer class="footer">
      <span class="todo-count"><strong>{this.itemsLeft}</strong> {this.itemsLeft === 1 ? 'item' : 'items'} left</span>
      <ul class="filters">
        <li>
          <a class={{selected: !Store.filter}} href="#/" onClick={this.updateFilter}>All</a>
        </li>
        <li>
          <a class={{selected: Store.filter === 'active'}} href="#/active" onClick={this.updateFilter}>Active</a>
        </li>
        <li>
          <a class={{selected: Store.filter === 'completed'}} href="#/completed" onClick={this.updateFilter}>Completed</a>
        </li>
      </ul>
      { Store.completedTodos.length === 0 ? null : (
        <button class="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
      )}
    </footer>;
  }
});
