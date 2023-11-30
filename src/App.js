import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://finalproject-backend-371z.onrender.com/api/todos';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTodos(data);
    };

    const addTodo = async () => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: newTodo, priority: 'low' }),
        });
        const data = await response.json();
        setTodos([...todos, data]);
        setNewTodo('');
    };

    const updateTodo = async (id, text, priority) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, priority }),
        });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        fetchTodos();
    };

    return (
        <div className="App">
            <div className="container">
                <h2>Todo App</h2>
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo._id} className="todo-item">
                            <span className={todo.priority === 'high' ? 'priority-high' : (todo.priority === 'medium' ? 'priority-medium' : 'priority-low')}>
                                {todo.text}
                            </span>
                            <div>
                                <button onClick={() => updateTodo(todo._id, prompt('Edit Todo', todo.text), todo.priority)}>Edit</button>
                                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                                <button onClick={() => updateTodo(todo._id, todo.text, prompt('Set Priority (high/medium/low)', todo.priority))}>Set as Priority</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <form className="add-todo-form">
                    <input
                        type="text"
                        placeholder="Add Todo"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button type="button" onClick={addTodo}>
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
