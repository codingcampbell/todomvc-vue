import Vue from 'vue';
import Store from '../Store';
import Todo from './Todo';

export default Vue.extend({
  name: 'TodoList',

  render() {
    /* These are here just to show the structure of the list items */
    /* List items should get the class `editing` when editing and `completed` when marked as completed */

    return Store.todos.length === 0 ? null : <section class="main">
      <input class="toggle-all" type="checkbox"/>
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">{ Store.todos.map((todo, index) =>
        <Todo key={index + '-' + todo.task} todo={todo}/>
      )}</ul>
    </section>;
  }
});
