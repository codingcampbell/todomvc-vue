import Vue from 'vue';
import Store from '../Store';
import Todo from './Todo';

export default Vue.extend({
  name: 'TodoList',

  render() {
    return Store.todos.length === 0 ? null : <section class="main">
      <input class="toggle-all" type="checkbox"/>
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">{ Store.todos.map((todo, index) =>
        <Todo key={index + '-' + todo.task} todo={todo}/>
      )}</ul>
    </section>;
  }
});
