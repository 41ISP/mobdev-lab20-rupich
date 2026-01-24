import { useEffect, useState } from 'react';
import FilterButtons from './components/FilterButtons';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { getObject, setObject } from './utils/storage';

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const loadData = async () => {
      const todos = await getObject("todos")
      setTodos(todos || [])
    };

    loadData();
  }, []);

  useEffect(() => {
    setObject("todos", todos)
  }, [todos])

  useEffect(() => {

    const saveData = async () => {
      
    };
    saveData();
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getFilteredTodos = () => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos;
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
