<template>
  <div id="app">
    <h1>To-Do List</h1>
    <input v-model="newTodo" @keyup.enter="handleAddTodo" placeholder="Add a new todo" />
    <ul v-if="filteredTodos.length">
      <li v-for="(todo, index) in filteredTodos" :key="index" class="todo-item">
        <div class="todo-item-text">
          <input v-if="todo.editing" v-model="todo.text" @blur="stopEditing(todo)" @keyup.enter="stopEditing(todo)" />
          <span v-else :class="{ completed: todo.completed }" @dblclick="startEditing(todo)">
            {{ todo.text }}
          </span>
        </div>
        <div class="todo-item-buttons">
          <button @click="toggleComplete(todo)">Complete</button>
          <button v-if="!todo.editing" @click="startEditing(todo)">Edit</button>
          <button @click="handleRemoveTodo(index)">Remove</button>
        </div>
      </li>
    </ul>
    <p v-else>Your To-do list is empty.</p>
    <button v-if="filteredTodos.length" @click="handleRemoveAll">Remove All</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      newTodo: '',
      filter: 'all'
    };
  },
  computed: {
    ...mapGetters(['todos']),
    filteredTodos() {
      if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed);
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    ...mapActions(['addTodo', 'removeTodo', 'toggleComplete', 'editTodo', 'removeAllTodos']), //functions
    handleAddTodo() {
      if (this.newTodo.trim()) {
        this.addTodo({
          text: this.newTodo,
          completed: false,
          editing: false
        });
        this.newTodo = '';
        alert('Todo added successfully!');
      } else {
        alert('Todo text cannot be empty!');
      }
    },
    handleRemoveTodo(index) {
      this.removeTodo(index);
    },
    toggleComplete(todo) {
      this.$store.dispatch('toggleComplete', todo);
    },
    startEditing(todo) {
      todo.editing = true;
    },
    stopEditing(todo) {
      if (!todo.text.trim()) {
        const index = this.todos.findIndex(t => t === todo);
        if (index !== -1) {
          this.removeTodo(index);
          alert('Todo removed due to empty text!');
        }
      } else {
        todo.editing = false;
        this.$store.dispatch('editTodo', todo);
        alert('Todo updated successfully!');
      }
    },
    handleRemoveAll() {
      this.removeAllTodos();
      alert('All todos removed successfully!');
    },
    filterTodos(filter) {
      this.filter = filter;
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
input {
  padding: 16px;
  font-size: 30px;
  margin-bottom: 20px;
  border-radius: 10px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 10px;
  background-color: #007bff;
  color: white; 
  border: none; 
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #0056b3;
}
ul {
  list-style-type: none;
  padding: 0;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
}

ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 25px;
  width: 100%;
}
.todo-item-text {
  display: flex;
  align-items: center;
}
.todo-item-buttons {
  display: flex; 
  gap: 5px; 
  white-space: nowrap; 
}
.completed {
  text-decoration: line-through;
  color: gray;
}
p {
  font-size: 20px;
  color: gray;
}

</style>
