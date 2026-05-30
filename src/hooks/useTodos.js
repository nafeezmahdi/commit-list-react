import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoData) => {
    try {
      await axios.post(`${API_URL}/todos`, todoData);
      fetchTodos();
    } catch (err) {
      console.error("Error creating todo:", err.message);
    }
  };

  const updateTodo = async (todoId, updatedData) => {
    try {
      await axios.put(`${API_URL}/todos/${todoId}`, updatedData);
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`${API_URL}/todos/${todoId}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, fetchTodos, addTodo, updateTodo, deleteTodo };
}
