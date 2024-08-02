import { createStore } from 'vuex';

const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export default createStore({
  state: {
    todos: loadTodosFromLocalStorage()
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
      saveTodosToLocalStorage(state.todos);
    },
    REMOVE_TODO(state, index) {
      state.todos.splice(index, 1);
      saveTodosToLocalStorage(state.todos);
    },
    TOGGLE_COMPLETE(state, todo) {
      const index = state.todos.indexOf(todo);
      if (index > -1) {
        state.todos[index].completed = !state.todos[index].completed;
        saveTodosToLocalStorage(state.todos);
      }
    },
    EDIT_TODO(state, todo) {
      const index = state.todos.indexOf(todo);
      if (index > -1) {
        state.todos.splice(index, 1, todo);
        saveTodosToLocalStorage(state.todos);
      }
    },
    REMOVE_ALL_TODOS(state) {
      state.todos = [];
      saveTodosToLocalStorage(state.todos);
    }
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo);
    },
    removeTodo({ commit }, index) {
      commit('REMOVE_TODO', index);
    },
    toggleComplete({ commit }, todo) {
      commit('TOGGLE_COMPLETE', todo);
    },
    editTodo({ commit }, todo) {
      commit('EDIT_TODO', todo);
    },
    removeAllTodos({ commit }) {
      commit('REMOVE_ALL_TODOS');
    }
  },
  getters: {
    todos: state => state.todos
  }
});
