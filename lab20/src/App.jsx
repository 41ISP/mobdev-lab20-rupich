import { useState } from 'react';
import FilterButtons from './components/FilterButtons';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const todos = () => {
    []   
  };
  const filter = (all) => {

  };
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Простой способ генерации уникального ID
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Функция для переключения статуса задачи
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Функция для удаления задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Фильтрация задач в зависимости от выбранного фильтра
  const getFilteredTodos = () => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos; // 'all'
  };
  return (
    <div className="app-container">
      <h1 className="app-title">📝 Мои задачи</h1>

      <TodoForm onAdd={addTodo} />

      <FilterButtons
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      <TodoList
        todos={getFilteredTodos()}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
export default App
