import Vue from 'vue';
import { mapGetters, mapMutations, mapState } from 'vuex';

export default Vue.extend({
  name: 'Footer',
  
  computed: {
    itemsLeft() {
      return this.activeTodos.length;
    },
    ...mapGetters(['activeTodos', 'completedTodos']),
    ...mapState(['filter']),
  },

  methods: {
    ...mapMutations(['clearCompletedTodos', 'getFilterFromURL']),
  },

  render() {
    return <footer class="footer">
      <span class="todo-count"><strong>{this.itemsLeft}</strong> {this.itemsLeft === 1 ? 'item' : 'items'} left</span>
      <ul class="filters">
        <li>
          <a class={{selected: !this.filter}} href="#/">All</a>
        </li>
        <li>
          <a class={{selected: this.filter === 'active'}} href="#/active">Active</a>
        </li>
        <li>
          <a class={{selected: this.filter === 'completed'}} href="#/completed">Completed</a>
        </li>
      </ul>
      { this.completedTodos.length === 0 ? null : (
        <button class="clear-completed" onClick={this.clearCompletedTodos}>Clear completed</button>
      )}
    </footer>;
  }
});
